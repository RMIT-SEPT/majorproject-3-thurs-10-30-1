import React, {Component} from 'react';
import '../App.css';
import DarkButton from "./DarkButton";

class BookingCreator extends Component
{
    render() {

        let label = {label: 'Show All Available', link: '/'}

    return (
        <div className = "bookingCreator">

        <h2 className="bookingListHeader"><center>Book a New Services</center></h2>
        
        
        <select className = "availableServices" name="Available Services">
        <option value = "Available Services">  Available Services </option>
        <option value = "Ali's Hairdresses">  Ali's Hairdresses </option>
        <option value = "Clearing Max"> Clearing Max </option>
        <option value = "Fady Car-Mechanic"> Fady Car-Mechanic </option>
        <option value = "IT Services"> Clearing Max </option>
        </select>

         <DarkButton label={label} />
         </div>
    )
}
}


export default BookingCreator;
