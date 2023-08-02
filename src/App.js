import './App.css';
import {useEffect} from 'react';
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

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  console.log("token", token)

  useEffect(() => {
    // the hash is the url that contains the access_token and other info
    const hash = window.location.hash
    let token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))
    // if the token exists then split the token
    if (token) {
      token = token.split("=")[1];
      dispatch(setToken(token));
    } 
  }, [dispatch])

  

  const logout = () => {
    dispatch(clearToken());
    console.log("LOGOUT CHECK", token)
    // setToken("")
  } 

  return (
  
    <div className="App">
      {!token ?
        /* if there is no token then display the login page */
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
        // if there is a token, display the actual app. logout takes the user back to login pg
        <div>
          <header className='temp' >
            <button onClick={logout} className="spotifyBtn">
              Logout
            </button>
          </header>
          <DisplayTopTracks></DisplayTopTracks>
        </div>
          
      }
  
    </div>
  );
}

export default App;
