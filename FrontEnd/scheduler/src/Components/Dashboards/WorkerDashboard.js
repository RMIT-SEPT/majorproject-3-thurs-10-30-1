import React, {Component} from "react";

import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getBookingByWorker} from "../../actions/userActions";
import BookingList from "../Dashboards/View/BookingList";
import {getServiceByWorker} from "../../actions/BusinessActions";
import ViewServicesSmall from "./View/ViewServiceSmall";


export class WorkerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state=
            {
                id:this.props.user.userId,
                bookings:undefined,
                businessId: undefined,
                services:undefined
            }
    }

    componentDidMount()
    {
        const id = this.props.user.userId;
        getBookingByWorker(id)
            .then(response => {
                this.setState({
                    bookings: response.data
                });
                getServiceByWorker(id)
                    .then(r =>{
                        this.setState({
                            services:r.data
                        })
                    })
            })
    }

    render() {

        if(!this.props.isLoggedIn)
        {
            return <Redirect to="/" />;
        }

        return (
            <div className="dashboardContainer2">
                {this.state.bookings
                ?
                    <BookingList bookings={this.state.bookings}/>
                    :<div> NON BOOKINGS</div>
                }
                <ViewServicesSmall services={this.state.services}/>
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

