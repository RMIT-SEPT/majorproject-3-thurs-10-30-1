import React from 'react';
import busyLady from "../../media/busy-lady.jpg"


function About(props)
{
    return(
            <div className="aboutContainer">
                <img src={busyLady} alt="a busy lady" className="fittedImage"/>
                <div className="darkTextBox">
                <p>AGME is a unique booking service, which can really help you make the most of your time!</p>
                    <br/>

                </div>
            </div>);
}

export default About;