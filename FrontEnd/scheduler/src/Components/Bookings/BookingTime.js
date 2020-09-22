import React, {Component} from "react";
import {Link} from "react-router-dom";
import AGMEnav from "../Generics/AGMEnav";

class bookingTime extends Component
{

    //onClick creates a new booking using the session attributes
    //uses the session worker to get avails
    render()
    {
        return(
            <div>
                <AGMEnav  />
                <select name="Available Times">
                    <option> Time 1</option>
                    <option> Time 2</option>
                </select>
                I will have a drop down box with all the available times
                <button> <Link to="/"> Create Booking! </Link> </button>
            </div>

        );
    }
}
export default bookingTime;

