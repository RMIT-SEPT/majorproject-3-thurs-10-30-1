import React, {Component} from "react";

import WorkerBookingList from "../Bookings/WorkerBookingList";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


export class WorkerDashboard extends Component {
    //get links based off of what the account type iss
    render() {
        let bookings = [
            {workerName: 'Ali ', service: "Ali's Hairdresser ", time: "13:30 ", date: "04/10"},
            {workerName: 'Max ', service: "Clearing Max ", time: "8:00 ", date: "10/10"},
            {workerName: 'Fady ', service: "Fady Car-Mechanic ", time: "15:30 ", date: "12/10"},
            {workerName: 'Zac ', service: "IT Services ", time: "11:15 ", date: "16/10"},
            {workerName: 'Ali ', service: "Ali's Hairdresses ", time: "18:45 ", date: "20/10"},
        ]

        if(!this.props.isLoggedIn)
        {
            return <Redirect to="/" />;
        }

        return (
            <div className="dashboardContainer2">
                {/*Add welcome Username*/}
                <WorkerBookingList bookings={bookings} title = {"Your upcoming Bookings"}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
        const {user} = state.auth;
        const {isLoggedIn} = state.auth
        return {
            user,
            isLoggedIn
        };
    }

export default connect(mapStateToProps) (WorkerDashboard);

