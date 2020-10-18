import React, {Component} from "react";
import BookingCreator from "../Bookings/BookingCreator";
import BookingList from "../Dashboards/View/BookingList"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getBookingForCustomer} from "../../actions/userActions";

export class Dashboard extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            bookings:undefined,
            id:undefined,
        }
    }

    componentDidMount()
    {
        getBookingForCustomer(this.props.user.userId).then(resp =>
        {
            this.setState(
                {
                    bookings:resp.data
                }
            )
        })
    }

  render()
  {
      if(!this.props.isLoggedIn)
      {
          return <Redirect to="/" />;
      }


    return (
        <div className="dashboardContainer">
            <p className = "DashboardWelcome">Welcome {this.props.user.name}</p>
            {this.state.bookings
                ?<BookingList bookings={this.state.bookings} />
                :
                <div> No Bookings</div>
            }
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


