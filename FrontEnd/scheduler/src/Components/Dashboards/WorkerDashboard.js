import React, {Component} from "react";

import WorkerBookingList from "../Bookings/WorkerBookingList";
import {connect} from "react-redux";
import {Dashboard} from "./Dashboard";


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
        return {
            user,
        };
    }

export default connect(mapStateToProps) (WorkerDashboard);

