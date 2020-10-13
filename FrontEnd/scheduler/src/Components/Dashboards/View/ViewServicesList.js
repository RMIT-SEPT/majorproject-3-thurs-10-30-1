import React, {Component} from "react";

import {getAdmin} from "../../../actions/userActions";
import {connect} from "react-redux";
import CustomCheckbox from "../../Generics/CustomCheckbox";

export class ViewServicesList extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                name: "",
                username: "",
                contactNumber: 0,
                email: "",
                password: "",

                successful: true,
                services: undefined,
                businessID: 0,
            };
    }

    componentDidMount()
    {
        this.selectedOptions = new Set();
        const id = this.props.user.userId;
        getAdmin(id)
            .then(response => {
                this.setState({
                    services: response.data.business.services,
                    businessID: response.data.business.id,
                    test: response.data.business.description
                });
            })
    }

    render() {

        const { message } = this.props;
        let realServ;
        const serv = this.state.services;
        if(serv)
        {
            realServ = serv.map((service) => (
            <h4 className="adminViewServices" key={service.id}>
                <h4 className="adminDashboardText">
                    Service ID: {service.id}
                    <br/>
                    Service: {service.name}
                    <br/>
                    Description:  {service.description}
                    <br/>
                </h4>
            </h4>
            ))
        }

        return (
            <div className= "AdminViewDashboard">

                <h2 className="pageHeader"> All Services</h2>

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