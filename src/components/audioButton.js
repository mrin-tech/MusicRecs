import React, {useState, useEffect} from 'react';

const AudioButton = ({imgBool, trackImg, trackName, trackArtists, previewAudioUrl, externalUrl}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioInstance, setAudioInstance] = useState(null)
    // console.log(trackName, previewAudioUrl)
    // const[seedAudioTracks, setSeedAudioTracks] = useState("")
    console.log(trackImg)
    const pauseAudio=()=> {
        console.log("pauseaudio", isPlaying)
        // setIsPlaying(false)
        if (audioInstance && !audioInstance.paused && isPlaying) {
            console.log("1", isPlaying, audioInstance)
            audioInstance.pause();
            setIsPlaying(false)
            console.log("2",isPlaying, audioInstance)
        }
    }

    const handleAudioClick = () => {
        
        console.log("CLICK")
        console.log(audioInstance)
        if (isPlaying) {
                pauseAudio()
        }
       
        // if audio is not playing
        console.log(isPlaying, "inside handle after pauseaudio function")
        if (!isPlaying) {
            console.log(isPlaying, "not playing, created audio instance")
            const newAudioInstance = new Audio(previewAudioUrl);
            newAudioInstance.play().catch(error => {
                console.error("Error loading audio:", error);
            });

            setIsPlaying(true);
            setAudioInstance(newAudioInstance);
        } 
    };

    useEffect(() => {
        return () => {

            if (audioInstance && !audioInstance.paused && isPlaying) {
            audioInstance.pause();
            setIsPlaying(false)
        }
        }
    }, [audioInstance, isPlaying]);

    return (
    <div >
        {imgBool && <img src={trackImg.url} alt="Trulli" width="200" height="200"></img>}
        <figcaption>
            <button className='trackBtn' onClick={handleAudioClick}>
                {isPlaying ? "Pause": "Play"}: {trackName} - {trackArtists}
            </button>
            <a href={externalUrl} style={{color: "#FFDDE2"}} target="_blank" rel="noreferrer">
                &#9836;
            </a>
        </figcaption>
    </div>
    )
}

export default AudioButton;