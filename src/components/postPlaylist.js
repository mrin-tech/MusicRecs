import axios from "axios";
import React, {useState} from "react";

const PostPlaylist = ({token, trackURIs}) => {
    const [externalURL, setExternalURL] = useState(null)
    const soupList = [
        "Tomato Soup",
        "Chicken Noodle Soup",
        "Minestrone Soup",
        "Clam Chowder",
        "Lentil Soup",
        "Miso Soup",
        "Pumpkin Soup",
        "Split Pea Soup",
        "French Onion Soup",
        "Cream of Mushroom Soup",
        "Broccoli Cheddar Soup",
        "Gazpacho",
        "Potato Leek Soup",
        "Beef Stew",
        "Vegetable Soup",
        "Hot and Sour Soup",
        "Pho",
        "Borscht",
        "Corn Chowder",
        "Ramen",
        "Tomato Rasam",
      ];
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
                name: soupList[Math.floor(Math.random() * soupList.length)],
                description: "This playlist was created with The Sound Soup",
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