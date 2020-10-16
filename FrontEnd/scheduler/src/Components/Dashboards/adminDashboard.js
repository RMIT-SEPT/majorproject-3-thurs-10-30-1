import React, {Component} from "react";
import { Tab, Tabs } from 'react-bootstrap'
import ViewWorkerList from "../Dashboards/View/ViewWorkersList";
import {connect} from "react-redux";
import {getAdmin} from "../../actions/userActions";
import ViewServicesList from "./View/ViewServicesList";
import {Redirect} from "react-router-dom";
import {getServiceByBusiness, getWorkerByBusiness} from "../../actions/BusinessActions";

export class adminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            businessName: undefined,
            businessId: undefined,
            services:undefined,
            workers:undefined,
        };
    }

    componentDidMount()
    {
        const id = this.props.user.userId;
        getAdmin(id)
            .then(response => {
                const id = response.data.business.id;
                this.setState({
                    businessId: id,
                    businessName: response.data.business.name
                });

                getWorkerByBusiness(id)
                    .then(resp =>{
                        this.setState(
                            {
                                workers:resp.data
                            });

                    })
                getServiceByBusiness(id)
                    .then(resp =>{
                        this.setState(
                            {
                                services:resp.data
                            });

                    })
            })

    }
    render() {

        if(!this.props.isLoggedIn)
        {
            return <Redirect to="/" />;
        }

        return (
            <div className="adminDashboardContainer">
                <h2 className = "DashboardWelcome"> {this.state.businessName}</h2>

                <Tabs defaultActiveKey="viewWorkers" id="uncontrolled-tab-example">
                    <Tab eventKey="viewWorkers" title="All Workers" >
                        <ViewWorkerList workers={this.state.workers} services={this.state.services} />
                    </Tab>

                    <Tab eventKey="viewBookings" title="All Bookings">
                        <div> How should we display bookings</div>
                    </Tab>

                    <Tab eventKey="viewServices" title="All Services" >
                        <ViewServicesList services={this.state.services}/>
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