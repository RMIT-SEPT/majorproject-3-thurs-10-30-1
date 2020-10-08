import React, {Component} from "react";

import {getAdmin} from "../../../actions/userActions";
import {connect} from "react-redux";

export class ViewWorkersList extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                name: "",
                username: "",
                contactNumber: 0,
                email: "",
                password: "",

                workers: undefined,

                successful: true,
                services: undefined,
                businessID: 0,
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

        let realWork;
        const work = this.state.workers;
        console.log(work);

       if(work)
        {
            realWork =  work.map((worker,index) => (
                <div key={worker.id} value={index}> <p>Name: {worker.user.name} Email: {worker.user.email} Contact Number: {worker.user.contactNumber}</p> </div>

            ))
        }


        return (
            <div> {realWork} </div>
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