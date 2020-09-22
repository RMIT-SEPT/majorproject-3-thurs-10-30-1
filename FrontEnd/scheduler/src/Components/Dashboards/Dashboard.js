import React, {Component} from "react";

import BookingCreator from "../Bookings/BookingCreator";
import BookingList from "../Bookings/BookingList";
import {connect} from "react-redux";
import {getAllBusiness} from "../../actions/business";

class Dashboard extends Component
{
    render() {

        let bookings = [
            {workerName: 'Ali ', service: "Ali's Hairdresser ", time: "13:30 ", date: "04/10"},
            {workerName: 'Max ', service: "Clearing Max ", time: "8:00 ", date: "10/10"},
            {workerName: 'Fady ', service: "Fady Car-Mechanic ", time: "15:30 ", date: "12/10"},
            {workerName: 'Zac ', service: "IT Services ", time: "11:15 ", date: "16/10"},
            {workerName: 'Ali ', service: "Ali's Hairdresses ", time: "18:45 ", date: "20/10"},
        ]

    return (

        <div className="dashboardContainer">
            {this.props.user ? <p>{this.props.user.name}</p> : <p> No user</p>}

            {/*if customer*/}
            <BookingList bookings={bookings}/>
            <BookingCreator />
            {/*if admin*/}
            {/*if worker*/}
        </div>
    )
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps) (Dashboard);