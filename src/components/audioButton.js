import React, {useState, useEffect} from 'react';

const AudioButton = ({trackName, trackArtists, previewAudioUrl, externalUrl}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioInstance, setAudioInstance] = useState(null)
    console.log(trackName, previewAudioUrl)
    // const[seedAudioTracks, setSeedAudioTracks] = useState("")

    const handleAudioClick = () => {
        if (audioInstance) {
            audioInstance.pause()
            setAudioInstance(null)
            setIsPlaying(false)
        }

        const newAudioInstance = new Audio(previewAudioUrl)
        if (newAudioInstance) {

            if (isPlaying) {
                newAudioInstance.pause();

            } else {
                // audioInstance.pause()
                // setAudioInstance(null)
                newAudioInstance.play().catch(error => {
                    console.error("Error loading audio:", error);
                });
            }
            setIsPlaying(!isPlaying);
            setAudioInstance(newAudioInstance)
            
        }
        // if (isPlaying) {
        //     newAudioInstance.pause();
        // } else {
        //     newAudioInstance.play();
        // }
        // setIsPlaying(!isPlaying);
        // setAudioInstance(newAudioInstance)

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
        <button className='trackBtn buttonRows' onClick={() => {handleAudioClick(); }}>
            {isPlaying ? "Pause" : "Play"}: {trackName} - {trackArtists}
        </button>
        <a href={externalUrl} style={{color: "#FFDDE2"}} target="_blank" rel="noreferrer">&#9836;</a>
    </div>
    )
}

export default AudioButton;