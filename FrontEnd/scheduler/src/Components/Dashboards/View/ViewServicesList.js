import React, {Component} from "react";

import {getAdmin} from "../../../actions/userActions";
import {connect} from "react-redux";

export class ViewServicesList extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                workers: undefined,
            };
    }

    componentDidMount()
    {
        const id = this.props.user.userId;
        getAdmin(id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    workers: response.data.business.workers
                });
                console.log(this.state.workers)
            })
    }

    render() {

        let listWorkers;
        const work = this.state.workers;
        console.log(work);

        if(work)
        {
            listWorkers =  work.map((worker,index) => (
                <h4 className="adminView" key={worker.id} value={index}>
                    Name: {worker.user.name}
                    <br/>
                    Email: {worker.user.email}
                    <br/>
                    Contact Number: {worker.user.contactNumber}
                </h4>
            ))
        }

        return (
            <div className= "AdminViewDashboard">

                <h2 className="pageHeader"> List of Staff</h2>

                <div className = "grid">
                    {listWorkers}
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