import React, {Component} from "react";

import {connect} from "react-redux";
import {getWorker} from "../../actions/userActions";


export class WorkerAvailabilities extends Component
{
    constructor(props) {
        super(props);
        this.state =
            {
                businesses: undefined,
                services: undefined,
                businessID: 0,
            };
    }

    componentDidMount() {
        const myId = this.props.user.userId;
        this.setState({
            id:myId
        });
        getWorker(myId)
            .then(response => {
                this.setState(
                    {
                        services:response.data.services,
                        businesses:response.data.businesses
                    }
                )
               console.log(this.state.businesses);
                });
    }

    render()
    {
        let businessList;
         if(this.state.businesses)
         {
             businessList = this.state.businesses.map((business) => (
                 <div> {business.name }</div>
             ))
         }

        return(
            <div>
                {businessList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps) (WorkerAvailabilities);
