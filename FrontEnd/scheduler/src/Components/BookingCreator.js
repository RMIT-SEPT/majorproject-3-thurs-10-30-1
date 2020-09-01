import React, {Component} from 'react';
import '../App.css';
import DarkButton from "./DarkButton";

class BookingCreator extends Component
{
    render() {

        let label = {label: 'Show me whats avalible', link: '/'}

    return (
        <div className = "bookingCreator">
        
        <button onclick="myFunction()" class="dropbtn">Dropdown</button>
        <div id="myDropdown" class="dropdown-content">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

         <DarkButton label={label} />
         </div>
    )
}
}


export default BookingCreator;
