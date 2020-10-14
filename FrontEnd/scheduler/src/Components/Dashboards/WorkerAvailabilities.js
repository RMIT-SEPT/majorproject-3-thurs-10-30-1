import React, {Component} from "react";
import {connect} from "react-redux";
import {getWorker} from "../../actions/userActions";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import TimePicker from 'react-time-picker'
import {numToDay, timeToken} from "../../utils/dateUtils";
import {createNewAvail} from "../../actions/BusinessActions";
import { Tab, Tabs } from 'react-bootstrap'


export class WorkerAvailabilities extends Component
{
    constructor(props) {
        super(props);
        this.state =
            {
                id:undefined,
                businesses: undefined,
                services: undefined,
                currentServiceId:-1,
                time:undefined,
                duration:30,
                day:1,
                message:"",
                successful:false
            };

        this.onChangeTime=this.onChangeTime.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onChange = (e) =>
    {
        this.setState({[e.target.name]: parseInt(e.target.value)});
    }

    onChangeTime = time => this.setState({ time })

    onSubmit = (e) =>
    {
        e.preventDefault();
        const servId = this.state.currentServiceId;

        if(servId>=0)
        {
            this.setState(
                {
                    message:""
                })

            const time = this.state.time;
            const hourToken = parseInt(timeToken(time, 0));
            const minuteToken = parseInt(timeToken(time, 1));
            console.log(hourToken);
            console.log(minuteToken);

            const avail =
            {
                dayOfWeek: this.state.day,
                hour: hourToken,
                minute: minuteToken,
                worker: this.state.id,
                duration: this.state.duration,
            }

            console.log(avail);
            console.log("Service id:" + servId);
            createNewAvail(avail,servId).then((response) => {
                    console.log(response.data);
                    this.setState(
                        {
                            successful:true,
                           message:"Booking Successful!"
                        });

                    if(response.data==="error")
                    {
                        //error state
                    }
                })
        }

        else
        {
            this.setState(
                {
                    successful:false,
                    message:"Error, please select a service"
                }
            )
        }

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
                });
    }

    render()
    {
        //let businessList;
         // if(this.state.businesses)
         // {
         //     businessList = this.state.businesses.map((business) => (
         //         <Tab key={business.id} title={business.name}>
         //             {
         //                 availList = business.services.map((avail,index) =>
         //                 {
         //                     console.log(avail);
         //                     if(avail.workedId === this.state.id)
         //                        return <li key={index}> Day: {numToDay(avail.day)} Time: {avail.hour}:{avail.minute} </li>
         //                 })
         //             }
         //         </Tab>
         //     ))
         // }

        let availList;
        if(this.state.services)
        {
            availList = this.state.services.map((service) => (
                <Tab eventKey={service.id} title={" Times for: " +service.name}>
                    <ul>
                    {
                        service.availablities.map((avail,index) =>
                        {
                            if(avail.workedId === this.state.id)
                               return  <li key={index}> Day: {numToDay(avail.day)} Time: {avail.hour}:{avail.minute} </li>
                        }
                        )}
                    </ul>
                </Tab>
            ))
        }

        let serviceList;
        if(this.state.services) {
            serviceList = this.state.services.map((service,index) => (
                <option key={index} value={service.id}> {service.name} </option>
            ))
        }

        const format="HH:mm";

        return(
            <div>
                <Tabs defaultActiveKey="viewBookings" id="uncontrolled-tab-example">
                {availList}
                </Tabs>
                <br/>

                <Form onSubmit={this.onSubmit}>
                    <h2> INPUT A NEW AVAIL </h2>
                    <h4> Select Service</h4>

                    <select value={this.state.currentServiceId} name="currentServiceId" onChange={this.onChange}>
                        <option value={-1} > Select a service: </option>
                        {serviceList}
                    </select>

                    <br/>
                    <h4> Select Day</h4>
                    <select value={this.state.day} name="day" onChange={this.onChange} required>
                        <option value={1}> Monday</option>
                        <option value={2}> Tuesday</option>
                        <option value={3}> Wednesday</option>
                        <option value={4}> Thursday</option>
                        <option value={5}> Friday</option>
                        <option value={6}> Saturday</option>
                        <option value={7}> Sunday</option>
                    </select>
                    <br/>
                    <h4> Select Start Time</h4>

                    <TimePicker
                        onChange={this.onChangeTime}
                        value={this.state.time}
                        format={format}
                        disableClock={true}
                        name="startTime"
                        required
                    >
                    </TimePicker>
                    <br/>
                    <h4> Input Duration</h4>
                    <input type="number"
                           required value={this.state.duration}
                           name="duration"
                           onChange={this.onChange}
                    />

                    <br/>
                    <Button type="submit"> Make Avail </Button>
                </Form>

                {this.state.message && (
                    <div className="form-group">
                        <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                            {this.state.message}
                        </div>
                    </div>
                )}

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
