import React, {Component} from 'react';

class BookingList extends Component
{
   

    render() {
        let myBookings = this.props.bookings.map((booking) =>
        {
            return(
                <h4 className="booking">
                Staff Member: {booking.workerName}
                Service: {booking.service} 
                Time: {booking.time}
                Date: {booking.date}
                </h4>
            );
        });

    return (
        <div className= "bookingList"> 
        <h2 className="bookingListHeader">Upcoming Bookings</h2>
        <div> {myBookings} </div>
        </div>
    )
        
}
}




export default BookingList;