import './App.css';
import {useEffect, useState} from 'react';
// import axios from 'axios';
// import Slider from '@mui/material/Slider'
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
  // const NUMSONGSLIMIT = 4;

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
  }, [dispatch, token])


  const logout = () => {
    dispatch(clearToken());
    console.log("LOGOUT CHECK")
    // setToken("")
  } 

  // async function getRecs (seedTracks, acousticness, danceability, popularity, energy, tempo, happy) {
  //   try {
  //     const {data} = await axios.get(`https://api.spotify.com/v1/recommendations`, {
  //       params: {
  //         seed_tracks: '7jPdqwZug0ovtDZsY5uK4T',
  //         target_acousticness: 0.5,
  //         target_danceability: 0.9,
  //         target_popularity: 0.5,
  //         target_energy: 0.5,
  //         target_tempo: 0.5,
  //         target_valence: 0.99,

  //       },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       }
  //     })
  //     console.log("get recommendations",data, data.max_acousticness)
  //   }
  //   catch(error) {
  //     console.error('Error when retreving reccomendations', error)
  //   }
  // }


  return (
  
    <div className="App">
      {/* <header className='App-header'> */}
      {!token ?
        <div>
          <header className='App-header'>
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}>
              <div className="spotifyHeader">
                Login to Spotify 
              </div>
            </a>
          </header> 

          <div className="plsLogin">
            Find new genres and tracks based on the metrics of a song. <br></br> Please login with Spotify to use this app!
          </div>
        </div>
        : 
        <header className='App-header'>
          <button onClick={logout} className="spotifyBtn">
            Logout
          </button>
        </header>  
      }
      {/* </header>   */}

      {token ? 
      
      <div className='sliders'>
        {/* <div>
          <button onClick={() => {getTopTracks(); getRecs();}} class="spotifyNewMusicBtn">
            Get Top Tracks
          </button>
        </div> */}
        <DisplayTopTracks></DisplayTopTracks>
        {/* <label >Acousticness (Amount of electrical amplification):</label> */}
        {/* <input type="range" id="acousticness-slider" name="acousticness" defaultValue="50" aria-label="Default" /> */}
        {/* <Slider defaultValue={50} aria-label="Acousticness" getAriaValueText={(e) => console.log(e)} valueLabelDisplay="auto" /> */}

        {/* <label >Danceability (tempo, rhythm and beats that determine the danceability):</label> */}
        {/* <input type="range" id="dance-slider" name="dance" defaultValue="50" aria-label="Default" /> */}
        {/* <Slider defaultValue={50} aria-label="Danceability" valueLabelDisplay="auto" /> */}
        

        {/* <label >Popularity:</label> */}
        {/* <input type="range" id="popular-slider" name="popular" defaultValue="50" aria-label="Default" /> */}
        {/* <Slider defaultValue={50} aria-label="Popularity" valueLabelDisplay="auto" /> */}
        

        {/* <label >Energy (the most energetic tracks are fast and loud):</label> */}
        {/* <input type="range" id="energy-slider" name="energy" defaultValue="50" aria-label="Default" /> */}
        {/* <Slider defaultValue={50} aria-label="Energy" valueLabelDisplay="auto" /> */}
        

        {/* <label >Tempo (beats per minute):</label> */}
        {/* <input type="range" id="loud-slider" name="loud" defaultValue="50" aria-label="Default" /> */}
        {/* <Slider defaultValue={50} aria-label="Tempo" valueLabelDisplay="auto" /> */}
        

        {/* <label >Happiness (lower values sound more negative, sad and angry, while higher values sound happy and euphoric):</label> */}
        {/* <input type="range" id="valence-slider" name="valence" defaultValue="50" aria-label="Default" /> */}
        {/* <Slider defaultValue={50} aria-label="Happiness" valueLabelDisplay="auto" /> */}
        
        {/* <button onClick={()=> {getRecs()}} className="spotifyNewMusicBtn">Find new music!</button> */}
      </div>
      : 
      <div>
      </div>
      } 
      
  

    </div>
  );
}

export default App;
