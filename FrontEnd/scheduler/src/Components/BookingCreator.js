import React, {Component} from 'react';
import '../App.css';
import DarkButton from "./DarkButton";

class BookingCreator extends Component
{
    render() {

        let label = {label: 'Show me whats avalible', link: '/'}

    return (
        <div className = "bookingCreator">
         i am a booking cfa 
         <DarkButton label={label} />
        </div>
    )
}
}


export default BookingCreator;
