import React, {useState, useEffect} from 'react';

const AudioButton = ({
    imgBool, 
    trackImg, 
    trackName, 
    trackArtists, 
    previewAudioUrl, 
    externalUrl, 
    onAudioToggle, 
    activeAudioInstance
    // play,
    // pause,
    }) => { 
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioInstance, setAudioInstance] = useState(new Audio())
    // console.log("onAudioToggle", onAudioToggle)

    const handleAudioClick = () => {
        console.log("****** INSIDE handleAudioClick *******")
        console.log( "isPlaying", isPlaying, " audioInstance: ", audioInstance)
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
        if (onAudioToggle) {
            onAudioToggle(newAudioInstance);
        }
        setIsPlaying(!isPlaying);
        setAudioInstance(newAudioInstance)

    console.log("isPlaying", isPlaying, " audioInstance: ", audioInstance, " newAudioInstance: ", newAudioInstance)
    console.log("****** END handleAudioClick *********************************************************************")

    }

    useEffect(() => {
        return () => {

            if (audioInstance) {
                audioInstance.pause()
                setAudioInstance(null)
            }
        }
    }, [audioInstance]);
  //   const [audioInstance, setAudioInstance] = useState(new Audio());
  // const handleAudioClick = () => {
  //   console.log("****** INSIDE handleAudioClick *******")
  //   console.log("play: ", play, " pause: ", pause, " audioInstance: ", audioInstance)
  //   if (audioInstance) {
  //       console.log("check1")
  //     audioInstance.pause();
  //     setAudioInstance(null);
  //   }

  //   const newAudioInstance = new Audio(previewAudioUrl);
    

  //   if (play && !pause) {
  //       console.log("check2")
  //     newAudioInstance.pause();
  //   } else if (!play && pause){
  //       console.log("check3")
  //     newAudioInstance.play();
  //   }

  //   setAudioInstance(newAudioInstance);
   
    
  //   console.log("play: ", play, " pause: ", pause, " audioInstance: ", audioInstance, " newAudioInstance: ", newAudioInstance)
  //   console.log("****** END handleAudioClick *******")
  //   onAudioToggle(play, pause, newAudioInstance);
  // };


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
            {!previewAudioUrl && <p style={{color: "#FFDDE2"}}>No audio preview avaliable for this track.</p>}
        </figcaption>
    </div>
    )
}

export default AudioButton;