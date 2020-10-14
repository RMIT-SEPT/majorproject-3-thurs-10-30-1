import React, {Component} from 'react';
import {getWorker} from "../../actions/userActions";

class WorkerDropDown extends Component
{
    constructor(props)
    {
        super(props);
        this.onChange=this.props.onChange;
    }

    render()
    {
        let workerList;
        const work = this.props.workerList;
        {
            workerList = work.map((worker, index) =>
            {
                getWorker(worker).then(r =>
                {
                    console.log("making this worker:");
                    console.log(r.data);
                    return <option key={worker} value={index}> {r.data.user.name} </option>;
                })
            })
        }

        return(
            <select onChange={this.onChange} value={this.props.value}>
                <option value="-1" > PLEASE Select A Worker:</option>
                {workerList}
            </select>
        )
    }
}

export default WorkerDropDown;
