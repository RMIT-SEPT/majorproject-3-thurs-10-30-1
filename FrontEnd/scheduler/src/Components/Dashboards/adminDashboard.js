import React, {Component} from "react";
import { Tab, Tabs } from 'react-bootstrap'
import WorkerBookingList from "../Bookings/WorkerBookingList";
import {connect} from "react-redux";



export class adminDashboard extends Component {

    render() {
        let bookings = [
            {workerName: 'Ali ', service: "Ali's Hairdresser ", time: "13:30 ", date: "04/10"},
            {workerName: 'Max ', service: "Clearing Max ", time: "8:00 ", date: "10/10"},
            {workerName: 'Fady ', service: "Fady Car-Mechanic ", time: "15:30 ", date: "12/10"},
            {workerName: 'Zac ', service: "IT Services ", time: "11:15 ", date: "16/10"},
            {workerName: 'Ali ', service: "Ali's Hairdresses ", time: "18:45 ", date: "20/10"},
        ]
        let title = " Your Business Bookings"
        return (
            <div className="adminDashboardContainer">
                <h2> Welcome {this.props.user.name}</h2>

                <Tabs defaultActiveKey="viewBookings" id="uncontrolled-tab-example">
                    <Tab eventKey="viewBookings" title="View Bookings">
                        <WorkerBookingList bookings={bookings} title={title}/>
                    </Tab>

                    <Tab eventKey="viewWorkers" title="View Workers" >
                        <div> I WILL SHOW ALL THE WORKERS</div>
                    </Tab>
                </Tabs>

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

export default connect(mapStateToProps) (adminDashboard);