import React, {useState, useRef, useEffect} from 'react';

const AudioButton = ({trackName, trackArtists, previewAudioUrl, externalUrl}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioInstance, setAudioInstance] = useState(null)

    const handleAudioClick = () => {
        if (audioInstance) {
            audioInstance.pause()
            setAudioInstance(null)
        }

        const newAudioInstance = new Audio(previewAudioUrl)
        if (isPlaying) {
            newAudioInstance.pause();
        } else {
            newAudioInstance.play();
        }
        setIsPlaying(!isPlaying);
        setAudioInstance(newAudioInstance)

    }

    useEffect(() => {
        return () => {

            if (audioInstance) {
                audioInstance.pause()
                setAudioInstance(null)
            }
        }
    }, [audioInstance]);

    return (
    <div>
        <button className='trackBtn' onClick={handleAudioClick}>
            {isPlaying ? "Pause" : "Play"}: {trackName} - {trackArtists}
        </button>
        <a href={externalUrl} style={{color: "#FFDDE2"}} target="_blank" rel="noreferrer">Open with Spotify</a>
    </div>
    )
    

}

export default AudioButton;