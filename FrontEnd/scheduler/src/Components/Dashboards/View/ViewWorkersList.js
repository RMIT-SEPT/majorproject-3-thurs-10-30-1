import React, {Component} from "react";

import {getAdmin} from "../../../actions/userActions";
import {connect} from "react-redux";

export class ViewWorkersList extends Component {

    componentDidMount()
    {
        this.selectedOptions = new Set();
        const id = this.props.user.userId;
        getAdmin(id)
            .then(response => {
                this.setState({
                    services: response.data.business.services,
                    businessID: response.data.business.id
                });
            })
    }

    render() {
        return (
            <p> test </p>
        )
    }
}

    function mapStateToProps(state) {
        const { user } = state.auth;
        return {
            user,
        };
    }

    export default connect(mapStateToProps) (ViewWorkersList);