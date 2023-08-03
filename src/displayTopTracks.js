import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@mui/material/Slider';

const NUMSONGSLIMIT = 15;

//----------------------------------------------------------------------------------------//
// GET TOP TRACKS
//----------------------------------------------------------------------------------------//
export const getTopTracks = (token) => async(dispatch) => {
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



const DisplayTopTracks = () => {
  //----------------------------------------------------------------------------------------//
  // VARIABLES AND STATES
  //----------------------------------------------------------------------------------------//
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [trackList, setTrackList] = useState([]);
  const [seedTracks, setSeedTracks] = useState("")
  const handleTrackClick = (trackID) => {
    console.log("Track ID:", trackID);
    setSeedTracks(trackID)
  };
  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(true)

  useEffect(() => {
    if (token) {
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

  const [showRecs, setShowRecs] = useState(false);
  const [recList, setRecList] = useState([]);
  
  //----------------------------------------------------------------------------------------//
  // GET RECCOMENDATIONS
  //----------------------------------------------------------------------------------------//
  async function getRecs (token, seedTracks, sliderValues) {
  try {
    const {data} = await axios.get(`https://api.spotify.com/v1/recommendations`, {
      params: {
        seed_tracks: seedTracks,
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
    console.log("get recommendations",data)
    const recList = data.tracks
    setRecList(recList)
    setShowRecs(true)
  }
  catch(error) {
    console.error('Error when retreving reccomendations', error)
  }
}



  // HTML
  return (
    // Get top tracks button
    <div >
      <div className="displayBg" >
      <button onClick={() => {getTopTracks(token); onClick();}} className="spotifyNewMusicBtn">
        Get Top Tracks
      </button>
      {
        showResults? 
          <ul style={{ listStyle: 'none' }} >
            {trackList?.map((track) => (
              <li key={track.id} >
                <button onClick={() => handleTrackClick(track.id)} className='trackBtn'>{track.name} - {track.artists.map((artist) => artist.name).join(', ')}</button>
              </li>
            ))}
          </ul>
        :
        null
      }
      </div>
      {/* sliders */}
      <div className='sliders'>
        <label >Acousticness (Amount of electrical amplification):</label>
        <Slider 
          defaultValue={50} 
          aria-label="Acousticness" 
          valueLabelDisplay="auto" 
          value={sliderValues.acoustic}
          onChange={handleSliderChange("acoustic")}
          />

        <label >Danceability (tempo, rhythm and beats that determine the danceability):</label>
        <Slider 
          defaultValue={50} 
          aria-label="Danceability" 
          valueLabelDisplay="auto" 
          value={sliderValues.dance}
          onChange={handleSliderChange("dance")}
          />
        

        <label >Popularity:</label>
        <Slider 
          defaultValue={50} 
          aria-label="Popularity" 
          valueLabelDisplay="auto"
          value={sliderValues.popular}
          onChange={handleSliderChange("popular")}
          />
        

        <label >Energy (the most energetic tracks are fast and loud):</label>
        <Slider 
          defaultValue={50} 
          aria-label="Energy" 
          valueLabelDisplay="auto" 
          value={sliderValues.energy}
          onChange={handleSliderChange("energy")}
          />
        

        <label >Tempo (beats per minute):</label>
        <Slider 
          defaultValue={50} 
          aria-label="Tempo" 
          valueLabelDisplay="auto" 
          value={sliderValues.tempo}
          onChange={handleSliderChange("tempo")}
          />
        

        <label >Happiness (lower values sound more negative, sad and angry, while higher values sound happy and euphoric):</label>
        <Slider 
          defaultValue={50} 
          aria-label="Happiness" 
          valueLabelDisplay="auto" 
          value={sliderValues.valence}
          onChange={handleSliderChange("valence")}
          />
        
        <button onClick={()=> {getRecs(token, seedTracks, sliderValues)}} className="spotifyNewMusicBtn">Find new music!</button>
        {
          showRecs? 
            <ul style={{ listStyle: 'none' }}>
              {recList?.map((track) => (
                <li key={track.id}>
                  <button onClick={() => {handleTrackClick(track.id);}}  className='trackBtn'>
                    {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
                  </button>
                </li>
              ))}
            </ul>
          :
            null
        }
      </div>
    </div>

  )
};

export default DisplayTopTracks;