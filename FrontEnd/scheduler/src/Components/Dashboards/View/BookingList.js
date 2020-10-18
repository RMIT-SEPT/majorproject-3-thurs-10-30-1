import React, {Component} from 'react';
import {connect} from "react-redux";

export class BookingList extends Component
{
    render()
    {
        let bookingList;
        let myBookings = this.props.bookings;

        bookingList= myBookings.map((booking,index) =>(
            <div key={index} className="booking">
            Customer: {booking.customerName} {'\n'}
            Worker: {booking.workerName} {'\n'}
            Service: {booking.serviceName} {'\n'}
            Date: {booking.date}{'\n'}
            Time: {booking.start_time}
            </div>
            ))

    return (
        <div className= "bookingList">
        <h2 className="pageHeader">Upcoming Bookings</h2>
         {bookingList}
        </div>
    )
        
}
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps) (BookingList);