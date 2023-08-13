import React, {useRef} from 'react';

const AudioButton = ({trackName, trackArtists, previewAudioUrl, externalUrl}) => {
    console.log("inside audio button", trackName, trackArtists, previewAudioUrl, externalUrl)
    return (
    <div>
        <button className='trackBtn'>
            {trackName} - {trackArtists}
        </button>

    </div>
    )
    

}

export default AudioButton;