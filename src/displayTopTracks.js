import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const NUMSONGSLIMIT = 10;

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
    // setTrackList(trackList)
    return trackList
    // dispatch({ payload: trackList });
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
    </div>

  )
};

export default DisplayTopTracks;