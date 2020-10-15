import React, {Component} from 'react';
import {connect} from "react-redux";

class BookingList extends Component
{
    render()
    {
        let bookingList;
        let myBookings = this.props.bookings;

        console.log(myBookings);
        bookingList= myBookings.map((booking,index) =>(
            <div key={index} className="booking"> I HAVE A BOOKING! ITS ID IS: {booking.id}</div>
            ))

    return (
        <div className= "bookingList">
        <h2 className="pageHeader">Upcoming Bookings</h2>
        <div> {bookingList} </div>
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