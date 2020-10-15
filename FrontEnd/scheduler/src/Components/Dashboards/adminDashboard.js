import React, {Component} from "react";
import { Tab, Tabs } from 'react-bootstrap'
import ViewWorkerList from "../Dashboards/View/ViewWorkersList";
import {connect} from "react-redux";
import {getAdmin} from "../../actions/userActions";
import ViewServicesList from "./View/ViewServicesList";
import {Redirect} from "react-router-dom";

export class adminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            businessName: undefined,
        };
    }

    componentDidMount()
    {
        const id = this.props.user.userId;
        getAdmin(id)
            .then(response => {
                this.setState({
                    businessName: response.data.business.name
                });
            })
    }

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
            <div className="adminDashboardContainer">
                <h2 className = "DashboardWelcome"> {this.state.businessName}</h2>

                <Tabs defaultActiveKey="viewWorkers" id="uncontrolled-tab-example">
                    <Tab eventKey="viewWorkers" title="All Workers" >
                        <ViewWorkerList />
                    </Tab>

                    <Tab eventKey="viewBookings" title="All Bookings">
                        <div> How should we display bookings</div>
                    </Tab>

                    <Tab eventKey="viewServices" title="All Services" >
                        <ViewServicesList/>
                    </Tab>
                </Tabs>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    const {isLoggedIn} = state.auth;
    return {
        user,
        isLoggedIn,
    };
}

export default connect(mapStateToProps) (adminDashboard);