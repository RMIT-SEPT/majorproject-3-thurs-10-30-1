import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAdmin} from "../../actions/userActions";

class BookingList extends Component
{
    constructor(props) {
        super(props);
        this.state=
            {
                id:this.props.user.userId,
                bookings:undefined,
                businessId: undefined,
            }
    }

    componentDidMount()
    {
        componentDidMount()
        {
            const id = this.props.user.userId;
            getAdmin(id)
                .then(response => {
                    this.setState({
                        businessId: response.data.business.id
                    });
                    getBookingByBusiness(this.state.businessId).then(resp =>{

                        this.setState(
                            {
                                bookings:resp.data.bookings;
                            }
                        )
                    })
                })
        }
    }

    render()
    {
        let bookingList;
        let myBookings = this.state.bookings;
        if (myBookings)
        {
            console.log(myBookings);
            bookingList= myBookings.map((booking,index) =>(
                <div key={index} className="booking"> I HAVE A BOOKING! ITS ID IS: {booking.id}</div>
            ))
        }

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