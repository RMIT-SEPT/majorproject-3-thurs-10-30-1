import React, {Component} from "react";
import BookingCreator from "../Bookings/BookingCreator";
import BookingList from "../Bookings/BookingList";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

export class Dashboard extends Component
{

  render()
  {
      if(!this.props.isLoggedIn)
      {
          return <Redirect to="/" />;
      }

    return (

        <div className="dashboardContainer">
            <p className = "DashboardWelcome">Welcome {this.props.user.name}</p>
            <BookingList />
            <BookingCreator />
        </div>
    )
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {accountType}= state.accountType;
    const {isLoggedIn} = state.auth;
    return {
        user,
        accountType,
        isLoggedIn
    };
}

export default connect(mapStateToProps) (Dashboard);