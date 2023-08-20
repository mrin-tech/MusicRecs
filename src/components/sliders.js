import React from 'react';
import Slider from '@mui/material/Slider';

const Sliders = ({ sliderValues, handleSliderChange }) => {
    return (
        <div className='sliders'>
            <h1 className='explainTxt'>
                Step 2: Experiment with the sliders to determine the the style of the music!
            </h1>
            <h4 className="sliderHeading">Modify the potential metrics of the generated songs!</h4>
            <div className='explainTxt'>
            For example, if you want a song with a lot of energy, move the Energy slider to the right.
            </div>

            <label >Acousticness 
            <div className="slider-subtitle">Amount of electrical amplification</div>
            </label>
            <Slider 
            defaultValue={50} 
            aria-label="Acousticness" 
            valueLabelDisplay="auto" 
            value={sliderValues.acoustic}
            onChange={handleSliderChange("acoustic")}
            />

            <label >Danceability 
            <div className="slider-subtitle">Tempo, rhythm and beats determine the danceability of a song</div>
            </label>
            <Slider 
            defaultValue={50} 
            aria-label="Danceability" 
            valueLabelDisplay="auto" 
            value={sliderValues.dance}
            onChange={handleSliderChange("dance")}
            />
            

            <label >Popularity
            <div className="slider-subtitle">How popular the track is on Spotify</div>
            </label>
            <Slider
            min={5} 
            defaultValue={50} 
            aria-label="Popularity" 
            valueLabelDisplay="auto"
            value={sliderValues.popular}
            onChange={handleSliderChange("popular")}
            />
            

            <label >Energy
            <div className="slider-subtitle">The most energetic tracks are fast and loud</div>
            </label>
            <Slider 
            defaultValue={50} 
            aria-label="Energy" 
            valueLabelDisplay="auto" 
            value={sliderValues.energy}
            onChange={handleSliderChange("energy")}
            />
            

            <label >Tempo 
            <div className="slider-subtitle">beats per minute</div>
            </label>
            <Slider 
            min={20}
            max={300}
            defaultValue={120} 
            aria-label="Tempo" 
            valueLabelDisplay="auto" 
            value={sliderValues.tempo}
            onChange={handleSliderChange("tempo")}
            />
            

            <label >Happiness 
            <div className="slider-subtitle">Lower values sound more negative, sad and angry, while higher values sound happy and euphoric</div>
            </label>
            <Slider 
            defaultValue={50} 
            aria-label="Happiness" 
            valueLabelDisplay="auto" 
            value={sliderValues.valence}
            onChange={handleSliderChange("valence")}
            />
        </div>
            
    )

}

export default Sliders;