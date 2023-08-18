import axios from "axios";
import React, {useState} from "react";

const PostPlaylist = ({token, trackURIs}) => {
    const [externalURL, setExternalURL] = useState(null)
    async function createPlaylist(token, trackURIs) {
        try {
            // get user id
            const {data: userData} = await axios.get(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            });
            const userID = userData.id
            
            // Create a new playlist
            const { data: playlistData } = await axios.post(
            `https://api.spotify.com/v1/users/${userID}/playlists`,
            {
                name: "1 Music Reccomendations For You!",
                description: "This playlist was created with the Musical Cauldron",
                "public": false
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
            }
          );
      
            const playlistID = playlistData.id;
      
            // Add tracks to the created playlist
            const { data: addTracksData } = await axios.post(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            {
                uris: trackURIs
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
            );
            setExternalURL(`https://open.spotify.com/playlist/${playlistID}`)
            console.log(externalURL)
            console.log("Playlist created and tracks added:", playlistID, addTracksData);
        } catch (error) {
            console.error("Error creating playlist and adding tracks", error);
        }
    }

    return (
        <div>
            <button 
            className="spotifyNewMusicBtn savethisplaylist" 
            onClick={()=> {
            createPlaylist(token, trackURIs)
            }}>
                SAVE THIS PLAYLIST
            </button>
            {externalURL && (
                <a
                    href={externalURL}
                    style={{ color: "#FFDDE2" }}
                    target="_blank"
                    rel="noreferrer"
                >
                    &#9836; Open Playlist
                </a>
            )}
        </div>
    )

}

export default PostPlaylist;