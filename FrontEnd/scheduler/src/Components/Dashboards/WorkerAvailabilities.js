import React, {Component} from "react";
import {connect} from "react-redux";
import {getWorker} from "../../actions/userActions";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import TimePicker from 'react-time-picker'


export class WorkerAvailabilities extends Component
{
    constructor(props) {
        super(props);
        this.state =
            {
                businesses: undefined,
                services: undefined,
                businessID: 0,
                time:undefined,
            };

        this.onChangeTime=this.onChangeTime.bind(this);
    }

    onChangeTime = time => this.setState({ time })

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
                console.log(this.state.services);
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

        let availList;
        if(this.state.services)
        {
            availList = this.state.services.map((service) => (
                <div>
                    {service.name}
                    <ul>
                    {
                        service.availablities.map((avail,index) =>
                        {
                            if(avail.workedId === this.state.id)
                               return  <li key={index}> Day: {avail.day} Time: {avail.hour}:{avail.minute} </li>
                            return
                        }
                        )}
                    </ul>
                </div>
            ))
        }

        let serviceList;
        if(this.state.services) {
            serviceList = this.state.services.map((service,index) => (
                <option key={index}> {service.name} </option>
            ))
        }
        const format="HH:mm";

        return(
            <div>
                {businessList}
                {availList}
                <br/>

                <Form>
                    <h2> AVAIL MAKER FORM</h2>

                    <select>
                        {serviceList}
                    </select>

                    <select>
                        <option> Monday</option>
                        <option> Tuesday</option>
                        <option> Wednesday</option>
                        <option> Thursday</option>
                        <option> Friday</option>
                        <option> Saturday</option>
                        <option> Sunday</option>
                    </select>

                    <TimePicker
                        onChange={this.onChangeTime}
                        value={this.state.time}
                        format={format}
                        disableClock={true}
                    >
                    </TimePicker>

                    <br/>
                    <Button> Make Avail </Button>
                </Form>

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
