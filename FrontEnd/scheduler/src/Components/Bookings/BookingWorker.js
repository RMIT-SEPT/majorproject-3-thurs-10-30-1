import React, {Component} from "react";
import {Link} from "react-router-dom";
import AGMEnav from "../Generics/AGMEnav";

class bookingWorker extends Component
{
    //on load gets all workers by service from the DB
    //on click, button sets the session 'current worker" to the one selected
    render()
    {
        return(
            <div>
            <AGMEnav />
                I will have a drop down box with all the available workers
                <select name="Available workers">
                    <option> Worker 1</option>
                    <option> Worker 2</option>
                </select>
                <button> <Link to="/booking/time"> Continue to Time Select </Link> </button>
            </div>

        );
    }
}
export default bookingWorker;

