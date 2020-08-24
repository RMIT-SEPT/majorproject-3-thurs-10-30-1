import React, {Component} from 'react';
import busyLady from "../../../media/busy-lady.jpg";


class About extends Component {
    render()
    {
        return(
            <div className="aboutContainer">
                <img src={busyLady} alt="a busy lady" className="fittedImage"/>
                <div className="darkTextBox">
                <p>"I will contain the left side of this thing"</p>
                </div>
            </div>
        );
    }
}

export default About;