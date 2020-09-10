import React, {Component} from "react";
import {Link} from "react-router-dom";
import AGMEnav from "../Generics/AGMEnav";

class bookingTime extends Component
{

    //onClick creates a new booking using the session attributes
    //uses the session worker to get avails
    render()
    {let links = [
        {label: 'Home', link: '/'},
        {label: 'Testing a Link', link: '/'},
        {label: 'Profile', link: '/profile'},
        {label: 'Sign-out', link: '/'}
    ]

        return(
            <div>
                <AGMEnav links={links} />
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

