import React, {Component} from 'react';
import {connect} from "react-redux";
import {getBookingForCustomer} from "../../actions/userActions";

class BookingList extends Component
{
    constructor(props) {
        super(props);
        this.state=
        {
            id:this.props.user.userId,
            bookings:undefined,
        }
    }

    componentDidMount()
    {
        getBookingForCustomer(this.state.id).then(resp =>
        {
            console.log(resp.data);
            this.setState(
                {
                    bookings:resp.data
                }
            )
        })




    }

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

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps) (BookingList);