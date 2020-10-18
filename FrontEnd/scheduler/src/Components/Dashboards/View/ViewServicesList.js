import React, {Component} from "react";
import {connect} from "react-redux";


//simple display of list of services, is passed list as props so no need to call API
export class ViewServicesList extends Component {
    render() {
        let realServ;
        const serv = this.props.services;
        if(serv)
        {
            realServ = serv.map((service) => (
            <div className="adminViewServices" key={service.id}>
                <h4 className="adminDashboardText">
                    Service ID: {service.id}
                    <br/>
                    Service: {service.name}
                    <br/>
                    Description:  {service.description}
                    <br/>
                    Bookings:
                </h4>
            </div>
            ))
        }

        return (
            <div className= "AdminViewDashboard">
                <h2 className="pageHeader">All Services</h2>
                <div className = "viewAllServicesGrid">
                    {realServ}
                </div>

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

export default connect(mapStateToProps) (ViewServicesList);