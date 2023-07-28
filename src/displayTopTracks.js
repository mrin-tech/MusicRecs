import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const NUMSONGSLIMIT = 10;
// async function getTrackInfo (trackID, token) {
//     try {
//       const {data} = await axios.get(`https://api.spotify.com/v1/tracks/`+trackID, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         }
//       })
//       console.log("get track info for", trackID, ": \n", data)

//     }
//     catch(error) {
//       console.error('Error retreviing this track', error)
//     }
//   }

// const getTopTracks = async(e, token) => {
//   // e.preventDefault();
//   try {
//     const {data} = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
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
//     console.log("get top tracks", data)
//     for (let i = 0; i < NUMSONGSLIMIT; i++) {
//       // let trackArtist = data.items[i].artist
//       let trackId = data.items[i].id
//       // console.log(trackGenre)
//       console.log(trackId)
//       getTrackInfo(trackId, token)
//     }
//   }
//   catch(error) {
//     console.error("Error retreiving users top tracks; ", error);
//   }
// }

export const getTopTracks = (token) => async(dispatch) => {
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
    return trackList
  }
  catch(error) {
    console.error("Error retreiving users top tracks; ", error);
  }
}

const DisplayTopTracks = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [trackList, setTrackList] = useState([]);
  const handleTrackClick = (trackID) => {
    // Handle click event for a track button
    console.log("Track ID:", trackID);
  };
  useEffect(() => {
    if (token) {
      // dispatch(getTopTracks(token));
      dispatch(getTopTracks(token)).then((tracks) => {
        setTrackList(tracks || []); // Update the track list state
      });
    }
  }, [dispatch, token]);
  return (
    <div>
      <button onClick={() => {getTopTracks(token);}} className="spotifyNewMusicBtn">
        Get Top Tracks
      </button>
      <ul>
        {trackList?.map((track) => (
          <li key={track.id}>
            <button onClick={() => handleTrackClick(track.id)}>{track.name} - {track.artists.map((artist) => artist.name).join(', ')}</button>
            {/* {track.name} - {track.artists.map((artist) => artist.name).join(', ')} */}
          </li>
        ))}
      </ul>
    </div>

  )
};

export default DisplayTopTracks;