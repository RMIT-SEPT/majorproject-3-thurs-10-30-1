import React, {Component} from "react";
import {connect} from "react-redux";

//simple display or workers, no need to call API
//also is passed in services, and uses a simple method to display relevant services for each worker.
export class ViewWorkersList extends Component {

    constructor(props) {
        super(props);
        this.getServices=this.getServices.bind(this);
    }

   getServices = (services,worker) =>
    {
        let servList = new Set();
        services.map(service=>
        {
            worker.services.map(workerService =>
            {
                if(workerService===service.id)
                {
                    servList.add(<li key={service.id}>{service.name}</li>)
                }
            })
        })
        return servList;
    }

    render()
    {
        let listWorkers;
        const work = this.props.workers;
        const serv = this.props.services;
       if(work)
        {
            listWorkers =  work.map((worker) => (
                <div className="adminViewWorker" key={worker.id}>
                    <h4 className="adminDashboardText">
                            Name: {worker.user.name}
                            <br/>
                            Email: {worker.user.email}
                            <br/>
                           Contact Number: {worker.user.contactNumber}
                           <br/>

                        {serv
                           ?
                            <div>
                                Services:
                                {this.getServices(serv,worker)}
                            </div>

                            :<p></p>}

                    </h4>
                </div>
            ))
        }
       
        return (
            <div className= "AdminViewDashboard">

                <h2 className="pageHeader"> All Staff Members</h2>

                 <div className = "viewAllWorkersGrid">
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

    export default connect(mapStateToProps) (ViewWorkersList);