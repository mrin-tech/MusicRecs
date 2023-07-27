import axios from 'axios';

import React from 'react';


// async function getTrackInfo (trackID) {
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


// const getTopTracks = async(e) => {
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
//       getTrackInfo(trackId)
//     }
//   }
//   catch(error) {
//     console.error("Error retreiving users top tracks; ", error);
//   }
// }

const DisplayTopTracks = () => {
  return (
    <div>
      why god
      {/* <button onClick={() => {getTopTracks();}} class="spotifyNewMusicBtn">
        Get Top Tracks
      </button> */}
    </div>

  )
};

export default DisplayTopTracks;