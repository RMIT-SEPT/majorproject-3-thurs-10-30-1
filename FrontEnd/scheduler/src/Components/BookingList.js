import React, {Component} from 'react';
import '../App.css';

class BookingList extends Component
{
   

    render() {
        let myBookings = this.props.bookings.map((booking) =>
        {
            return(
                <h4 className="booking"> 
                <center>
                Staff Memeber: {booking.workerName} 
                Service: {booking.service} 
                Time: {booking.time}
                Date: {booking.date}
                </center> 
                </h4>
            );
        });

    return (
        <div className= "bookingList"> 
        <h2 className="bookingListHeader"><center>Upcoming Bookings</center></h2>
        <div> {myBookings} </div>
        </div>
    )
        
}
}




export default BookingList;