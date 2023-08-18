import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Slider from '@mui/material/Slider';
import AudioButton from './components/audioButton'
import Sliders from './components/sliders';
import PostPlaylist from './components/postPlaylist';

const NUMSONGSLIMIT = 50;
const RANDOMSONGLIMIT = 15;

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
    const topTracks = data.items;

    // Randomly select 10 tracks from topTracks
    const randIndexList = [];
    while (randIndexList.length < RANDOMSONGLIMIT) {
      const randomIndex = Math.floor(Math.random() * topTracks.length);
      if (!randIndexList.includes(randomIndex)) {
        randIndexList.push(randomIndex);
      }
    }

    const trackList = randIndexList.map((index) => topTracks[index]);

    return trackList;
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

  const handleGetTopTracks = (token) => {
    // Call the getTopTracks function to fetch new random tracks
    dispatch(getTopTracks(token)).then((tracks) => {
      setTrackList(tracks || []); // Update the track list state
      setShowResults(true); // Show the results after getting new tracks
    });
  };
  

  const [showRecs, setShowRecs] = useState(false);
  const [recList, setRecList] = useState(new Set());
  const [trackURIs, setTrackURIs] = useState([])
  

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
          min_popularity: sliderValues.popular,
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
      setTrackURIs(recList.map(track=> track.uri))
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
      <div className='describeTheApp'>
        Play, Discover, Groove! 
        <br></br>
        Discover Spotify music based on your musical preferences!  
      </div>
      <div className='row'>
        {/* STEP 1: TOP TRACKS */}
        <div className='column'>
          <div className="displayBg" >
            <h1 className='explainTxt'>
              Step 1: Choose a song to generate reccomendations on!
            </h1>
            <button onClick={() => {handleGetTopTracks(token); onClick();}} className="spotifyNewMusicBtn">
              Get Top Tracks
            </button>
            <div className='explainTxt'>
            Click the radio button next to the track to choose song for generation, click tracks to listen!
            </div>
            {
            showResults? 
              <ul style={{ listStyle: 'none' }} >
                {trackList?.map((track) => (
                  <li key={track.id} >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input type="radio" className="radioBtn" id={track.id} name="radio" onClick={() => handleTrackClick(track.id)}></input>
                      <label for={track.id}>
                        <AudioButton
                          imgBool={false}
                          trackImg={null}
                          trackName={track.name}
                          trackArtists={track.artists.map((artist)=>artist.name).join(', ')}
                          previewAudioUrl={track.preview_url}
                          externalUrl={track.external_urls.spotify}
                        >
                        </AudioButton>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            :
            null
            }
          </div>
        </div>
        {/* STEP 2: SLIDERS */}
        <div className='column'>
          <Sliders sliderValues={sliderValues} handleSliderChange={handleSliderChange}></Sliders>  
        </div>
      </div>
       {/* STEP 3: FIND NEW MUSIC */}
      <div className="displayBg findNewMusic">
      <h1 className='explainTxt'>
        Step 3: Find new music with the playlist generated below!
      </h1>
      <button onClick={()=> {getRecs(token, seedTracks, sliderValues);}} className="spotifyNewMusicBtn">
        Find new music!
      </button>
      {
        showRecs? 
        <div>
          <PostPlaylist token={token} trackURIs = {trackURIs} >
          </PostPlaylist>
          <ul className='wrapper' >
            {recList?.map((track) => (
              <div className='items'>
              <li key={track.id} >
                <AudioButton 
                imgBool={true}
                trackImg={track.album.images[1]}
                trackName={track.name}
                trackArtists={track.artists.map((artist)=>artist.name).join(', ')}
                previewAudioUrl={track.preview_url}
                externalUrl={track.external_urls.spotify}
                >
                </AudioButton>
              </li>
              </div>
            ))}
           
          </ul>
          </div>
          
        :
          null
      }
      </div>
    </div>

  )
};

export default DisplayTopTracks;