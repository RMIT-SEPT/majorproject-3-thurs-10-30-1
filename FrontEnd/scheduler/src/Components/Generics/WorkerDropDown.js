import React, {Component} from 'react';

class WorkerDropDown extends Component
{
    render()
    {
        let workerList;
        const work = this.props.workerList;
        workerList = work.map((worker, index) =>
        {
            return <option key={worker.id} value={index}> {worker.user.name} </option>;
        })


        return(
            <select onChange={this.props.onChange} value={this.props.value} name={this.props.name}>
                <option value="-1" disabled > Please Select A Worker:</option>
                {workerList}
            </select>
        )
    }
}

export default WorkerDropDown;
