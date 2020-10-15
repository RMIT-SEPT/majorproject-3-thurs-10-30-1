import React, {Component} from "react";

import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getBookingByWorker} from "../../actions/userActions";
import BookingList from "../Bookings/BookingList";


export class WorkerDashboard extends Component {
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
        const id = this.props.user.userId;
        getBookingByWorker(id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    bookings: response.data
                });
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
                ?<BookingList bookings={this.state.bookings}/>
                    :<div> NON BOOKINGS</div>
                }

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

