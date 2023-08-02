import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@mui/material/Slider';


const NUMSONGSLIMIT = 15;

export const getTopTracks = (token) => async(dispatch) => {
  // e.preventDefault();
  try {
    const {data} = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
      params: {
        limit: NUMSONGSLIMIT,
        offset: 5,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }) 
    console.log("get top tracks", data.items[1])
    let trackList = []

    for (let i = 0; i < NUMSONGSLIMIT; i++) {
      // let trackArtist = data.items[i].artist
      // let trackId = data.items[i].id
      // console.log(trackGenre)
      // console.log(trackId)
      // getTrackInfo(trackId)
      trackList.push(data.items[i])

    }
    // setTrackList(trackList)
    return trackList
    // dispatch({ payload: trackList });
  }
  catch(error) {
    console.error("Error retreiving users top tracks; ", error);
  }
}

async function getRecs (token, seedTracks, sliderValues) {
  try {
    const {data} = await axios.get(`https://api.spotify.com/v1/recommendations`, {
      params: {
        seed_tracks: '7jPdqwZug0ovtDZsY5uK4T',
        target_acousticness: sliderValues.acoustic,
        target_danceability: sliderValues.dance,
        target_popularity: sliderValues.popular,
        target_energy: sliderValues.energy,
        target_tempo: sliderValues.tempo,
        target_valence: sliderValues.valence,

      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    console.log("get recommendations",data, data.max_acousticness)
  }
  catch(error) {
    console.error('Error when retreving reccomendations', error)
  }
}



const DisplayTopTracks = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [trackList, setTrackList] = useState([]);
  const handleTrackClick = (trackID) => {
    console.log("Track ID:", trackID);
  };

  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(true)

  useEffect(() => {
    if (token) {
      // dispatch(getTopTracks(token));
      dispatch(getTopTracks(token)).then((tracks) => {
        setTrackList(tracks || []); // Update the track list state
      });
    }
  }, [dispatch, token]);
  const [sliderValues, setSliderValue] = useState({
    acoustic: 50,
    dance: 50,
    popular: 50,
    energy: 50,
    tempo: 50,
    valence: 50,
  })
 
  const handleSliderChange = (sliderName) => (event, newValue) => {
    setSliderValue((prevValues) => ({
      ...prevValues,
      [sliderName]: newValue,
    }))
  };


  return (
    <div>
      <button onClick={() => {getTopTracks(token); onClick();}} className="spotifyNewMusicBtn">
        Get Top Tracks
      </button>
      {
        showResults? 
      
      <ul>
        {trackList?.map((track) => (
          <li key={track.id}>
            <button onClick={() => handleTrackClick(track.id)}>{track.name} - {track.artists.map((artist) => artist.name).join(', ')}</button>
            {/* {track.name} - {track.artists.map((artist) => artist.name).join(', ')} */}
          </li>
        ))}
      </ul>
      :
      null
      }
      <div className='sliders'>
      <label >Acousticness (Amount of electrical amplification):</label>
        {/* <input type="range" id="acousticness-slider" name="acousticness" defaultValue="50" aria-label="Default" /> */}
        <Slider 
          defaultValue={50} 
          aria-label="Acousticness" 
          // getAriaValueText={(e) => console.log(e)} 
          valueLabelDisplay="auto" 
          value={sliderValues.acoustic}
          onChange={handleSliderChange("acoustic")}/>

        <label >Danceability (tempo, rhythm and beats that determine the danceability):</label>
        {/* <input type="range" id="dance-slider" name="dance" defaultValue="50" aria-label="Default" /> */}
        <Slider 
          defaultValue={50} 
          aria-label="Danceability" 
          valueLabelDisplay="auto" 
          value={sliderValues.dance}
          onChange={handleSliderChange("dance")}
          />
        

        <label >Popularity:</label>
        {/* <input type="range" id="popular-slider" name="popular" defaultValue="50" aria-label="Default" /> */}
        <Slider 
          defaultValue={50} 
          aria-label="Popularity" 
          valueLabelDisplay="auto"
          value={sliderValues.popular}
          onChange={handleSliderChange("popular")}
          />
        

        <label >Energy (the most energetic tracks are fast and loud):</label>
        {/* <input type="range" id="energy-slider" name="energy" defaultValue="50" aria-label="Default" /> */}
        <Slider 
          defaultValue={50} 
          aria-label="Energy" 
          valueLabelDisplay="auto" 
          value={sliderValues.energy}
          onChange={handleSliderChange("energy")}
          />
        

        <label >Tempo (beats per minute):</label>
        {/* <input type="range" id="loud-slider" name="loud" defaultValue="50" aria-label="Default" /> */}
        <Slider 
          defaultValue={50} 
          aria-label="Tempo" 
          valueLabelDisplay="auto" 
          value={sliderValues.tempo}
          onChange={handleSliderChange("tempo")}
          />
        

        <label >Happiness (lower values sound more negative, sad and angry, while higher values sound happy and euphoric):</label>
        {/* <input type="range" id="valence-slider" name="valence" defaultValue="50" aria-label="Default" /> */}
        <Slider 
          defaultValue={50} 
          aria-label="Happiness" 
          valueLabelDisplay="auto" 
          value={sliderValues.valence}
          onChange={handleSliderChange("valence")}
          />
        
        <button onClick={()=> {getRecs(token, sliderValues)}} className="spotifyNewMusicBtn">Find new music!</button>
      </div>
    </div>

  )
};

export default DisplayTopTracks;