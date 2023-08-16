import './App.css';
import {useEffect} from 'react';
import DisplayTopTracks from './displayTopTracks';
import { setToken } from './store/authSlice';
import { clearToken } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDraRd-otmEJmrQswhr4-Ki8jq1q3cEcI0",
//   authDomain: "spotifyrecs-9a3f4.firebaseapp.com",
//   projectId: "spotifyrecs-9a3f4",
//   storageBucket: "spotifyrecs-9a3f4.appspot.com",
//   messagingSenderId: "91566939688",
//   appId: "1:91566939688:web:07d2ce77e67b7817b01f1d",
//   measurementId: "G-PMLGQHWNZP"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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
  } 

  return (
  
    <div className="App">
      {!token ?
        /* if there is no token then display the login page */
        <div>
          <div className='App-header'>
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}>
              <div className="spotifyHeader">
                Login to Spotify 
              </div>
            </a>
          </div> 

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
