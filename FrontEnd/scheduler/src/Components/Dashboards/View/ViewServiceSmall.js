import React, {Component} from "react";
import {connect} from "react-redux";

export class ViewServicesSmall extends Component {
    render() {
        let realServ;
        const serv = this.props.services;
        if(serv)
        {
            realServ = serv.map((service) => (
                <div className="workerViewServices" key={service.id}>
                    <h4 className="WorkerServicesText">
                        Service ID: {service.id}
                        <br/>
                        Service: {service.name}
                        <br/>
                        Description:  {service.description}
                    </h4>
                </div>
            ))
        }

        return (
            <div className= "WorkerViewDashboard">
                <h2 className="pageHeader"> My Services</h2>
                <div className="workerSmallServices">
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

export default connect(mapStateToProps) (ViewServicesSmall);