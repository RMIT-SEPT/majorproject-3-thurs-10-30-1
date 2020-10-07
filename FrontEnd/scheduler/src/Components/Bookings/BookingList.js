import React, {Component} from 'react';

class BookingList extends Component
{

    render() {
        let myBookings = this.props.bookings.map((booking) =>
        {
            return(
                <h4 className="booking" key={booking.service}>
                Customer Name: {booking.customer}
                Staff Member: {booking.worker}
                Service: {booking.service} 
                Start Time: {booking.start_time}
                End Time: {booking.end_time}
                </h4>
            );
        });

    return (
        <div className= "bookingList"> 

        <h2 className="pageHeader">Upcoming Bookings</h2>

        <div> {myBookings} </div>
        </div>
    )
        
}
}




export default BookingList;