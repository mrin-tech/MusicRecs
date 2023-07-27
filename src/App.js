import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Slider from '@mui/material/Slider'
import DisplayTopTracks from './displayTopTracks';
import { setToken } from './store/authSlice';
import { clearToken } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const CLIENT_ID = "6fd0679bcd0246798720194c06b94911";
  const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = "token";
  const scopes = "user-library-read user-top-read";
  const NUMSONGSLIMIT = 4;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // const [token, setToken] = useState("");
  useEffect(() => {
    // the hash is the url that contains the access_token and other info
    const hash = window.location.hash
    let token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))
    // if the token exists then split the token
    if (token) {
      token = token.split("=")[1];
    } 
    dispatch(setToken(token));
    // setToken(token)
  }, [])


  const logout = () => {
    dispatch(clearToken());
    // setToken("")
  } 

  // returns a list of the users saved tracks
  // const getTracks = async(e) => {
  //   // e.preventDefault();
  //   try {
  //     const {data} = await axios.get("https://api.spotify.com/v1/me/tracks", {
  //       params: { limit: NUMSONGSLIMIT, offset: 0 },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       }
  //     })

  //     console.log('gettracks KEN!', data)
  //     // get the id for a track
  //     // console.log(data.items[0].track.id)

  //     for (let i = 0; i < NUMSONGSLIMIT; i++) {
  //       let trackId = data.items[i].track.id
  //       console.log(trackId)
  //       getAudioFeatures(trackId)
  //       getAudioAnalysis(trackId)
  //     }

  //     // test track id
  //     // getAudioFeatures("11dFghVXANMlKmJXsNCbNl")
  //     // getAudioAnalysis("11dFghVXANMlKmJXsNCbNl")
  //   }
  //   catch(error) {
  //     console.error("Error retreiving user tracks; ", error);
  //   }
  // }
  
  
  // audio features function
  // async function getAudioFeatures (trackID) {
  //   try {
  //     const {data} = await axios.get(`https://api.spotify.com/v1/audio-features/`+trackID, {
  //         // params: { id: trackID.toString()},
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         }
  //     })
  //     console.log("audio features", data)
  //   }
  //   catch(error) {
  //     console.error("Error retreiving audio features; ", error);
  //   }
  // }

  // // audio analysis function
  // async function getAudioAnalysis (trackID) {
  //   try {
  //     const {data} = await axios.get(`https://api.spotify.com/v1/audio-analysis/`+trackID, {
  //         // params: { id: trackID.toString()},
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         }
  //     })
  //     console.log("audio analysis", data)
  //   }
  //   catch(error) {
  //     console.error("Error retreiving audio analysis; ", error);
  //   }
  // }

  async function getTrackInfo (trackID) {
    try {
      const {data} = await axios.get(`https://api.spotify.com/v1/tracks/`+trackID, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      console.log("get track info for", trackID, ": \n", data)

    }
    catch(error) {
      console.error('Error retreviing this track', error)
    }
  }

  const getTopTracks = async(e) => {
    // e.preventDefault();
    try {
      const {data} = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
        params: {
          limit: 10,
          offset: 5,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }) 
      console.log("get top tracks", data)
      for (let i = 0; i < NUMSONGSLIMIT; i++) {
        // let trackArtist = data.items[i].artist
        let trackId = data.items[i].id
        // console.log(trackGenre)
        console.log(trackId)
        getTrackInfo(trackId)
        // getAudioFeatures(trackId)
        // getAudioAnalysis(trackId)
      }
    }
    catch(error) {
      console.error("Error retreiving users top tracks; ", error);
    }
  }

  // const getTopArtists = async(e) => {
  //   // e.preventDefault();
  //   try {
  //     const {data} = await axios.get(`https://api.spotify.com/v1/me/top/artists`, {
  //       params: {
  //         limit: 10,
  //         offset: 5,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       }
  //     }) 
  //     console.log("get top artists", data)
  //     for (let i = 0; i < NUMSONGSLIMIT; i++) {
  //       let artistGenre = data.items[i].genres
  //       console.log(artistGenre)
  //     }
  //   }
  //   catch(error) {
  //     console.error("Error retreiving users top tracks; ", error);
  //   }
  // }

  async function getRecs () {
    try {
      const {data} = await axios.get(`https://api.spotify.com/v1/recommendations`, {
        params: {
          seed_tracks: '7jPdqwZug0ovtDZsY5uK4T',
          target_acousticness: 0.5,
          target_danceability: 0.9,
          target_valence: 0.99,

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


  return (
  
    <div className="App">
      {/* <header className='App-header'> */}
      {!token ?
        <div>
          <header className='App-header'>
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}>
              <div class="spotifyHeader">
                Login to Spotify 
              </div>
            </a>
          </header> 

          <div class="plsLogin">
            Find new genres and tracks based on the metrics of a song. <br></br> Please login with Spotify to use this app!
          </div>
        </div>
        : 
        <header className='App-header'>
          <button onClick={logout} class="spotifyBtn">
            Logout
          </button>
        </header>  
      }
      {/* </header>   */}

      {token ? 
      
      <div class='sliders'>
        {/* <div>
          <button onClick={() => {getTopTracks(); getRecs();}} class="spotifyNewMusicBtn">
            Get Top Tracks
          </button>
        </div> */}
        <DisplayTopTracks></DisplayTopTracks>
        <label for="acousticness-slider">Acousticness (Amount of electrical amplification):</label>
        {/* <input type="range" id="acousticness-slider" name="acousticness" defaultValue="50" aria-label="Default" /> */}
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />

        <label for="dance-slider">Danceability (tempo, rhythm and beats that determine the danceability):</label>
        {/* <input type="range" id="dance-slider" name="dance" defaultValue="50" aria-label="Default" /> */}
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        

        <label for="popular-slider">Popularity:</label>
        {/* <input type="range" id="popular-slider" name="popular" defaultValue="50" aria-label="Default" /> */}
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        

        <label for="energy-slider">Energy (the most energetic tracks are fast and loud):</label>
        {/* <input type="range" id="energy-slider" name="energy" defaultValue="50" aria-label="Default" /> */}
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        

        <label for="tempo-slider">Tempo (beats per minute):</label>
        {/* <input type="range" id="loud-slider" name="loud" defaultValue="50" aria-label="Default" /> */}
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        

        <label for="valence-slider">Happiness (lower values sound more negative, sad and angry, while higher values sound happy and euphoric):</label>
        {/* <input type="range" id="valence-slider" name="valence" defaultValue="50" aria-label="Default" /> */}
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        
        <button class="spotifyNewMusicBtn">Find new music!</button>
      </div>
      : 
      <div>
      </div>
      } 
      
  

    </div>
  );
}

export default App;
