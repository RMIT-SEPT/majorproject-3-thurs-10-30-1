import React, {Component} from "react";

import BookingCreator from "../Bookings/BookingCreator";
import BookingList from "../Bookings/BookingList";
import {connect} from "react-redux";

export class Dashboard extends Component
{

  render() {
    let bookings = [

        {customer: 'Test ',worker: 'Ali ', service: "Ali's Hairdresser ", start_time: "13:30 ", end_time: "13:30"},
        {customer: 'Test ',worker: 'Max ', service: "Clearing Max ", start_time: "8:00 ", end_time: "8:00"},
        {customer: 'Test ',worker: 'Fady ', service: "Fady Car-Mechanic ", start_time: "15:30 ", end_time: "15:30"},
        {customer: 'Test ',worker: 'Zac ', service: "IT Services ", start_time: "11:15 ", end_time: "11:15"}, 
        {customer: 'Test ',worker: 'Ali ', service: "Ali's Hairdresses ", start_time: "18:45 ", end_time: "18:45"},
 
    ]

    return (

        <div className="dashboardContainer">

            {this.props.user ?  <p className = "DashboardWelcome"> Welcome {this.props.user.name} </p> : <p> No user</p>}

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