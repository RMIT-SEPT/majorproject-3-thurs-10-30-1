import React, {Component} from "react";
import {connect} from "react-redux";
import {getWorker} from "../../actions/userActions";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import TimePicker from 'react-time-picker'
import {numToDay, timeToken} from "../../utils/dateUtils";
import {createNewAvail, getAvailByService, getServiceByWorker} from "../../actions/BusinessActions";


export class WorkerAvailabilities extends Component
{
    constructor(props) {
        super(props);
        this.state =
            {
                id:this.props.user.userId,
                services: undefined,
                avails:undefined,

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

    componentDidMount() {
        const myId = this.state.id;
        getServiceByWorker(myId)
            .then(response => {
                console.log("logging services");
                console.log(response.data);
                this.setState(
                    {
                        services:response.data,
                        //businessIds:response.data.businesses
                    })
                getAvailByService(this.state.currentServiceId)
                    .then(r =>
                    {
                        console.log(r.data);
                        this.setState({
                            avails: r.data,
                        })
                    })
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevState.currentServiceId!==this.state.currentServiceId ||
        prevState.message!== this.state.message)
        {
            console.log("there was a change:");
            console.log(this.state.services);
            console.log(this.state.currentServiceId);
            getAvailByService(this.state.currentServiceId)
                .then(r =>
                {
                    console.log(r.data);
                    this.setState({
                        avails: r.data,
                    })
                })
        }

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

            const timeAvailabilityRequest =
            {
                day: this.state.day,
                hour: hourToken,
                minute: minuteToken,
                workerId: this.state.id,
                length: this.state.duration,
            }

            console.log(timeAvailabilityRequest);
            console.log("Service id:" + servId);
            createNewAvail(timeAvailabilityRequest,servId).then((response) =>
            {
                    if(response)
                    {
                        console.log(response.data);
                        this.setState(
                            {
                                successful:true,
                                message:"avail Successful!",
                            });
                    }
                    else
                    {
                       this.setState(
                           {
                               successful:false,
                               message:"fail lmao"
                           }
                       )
                    }
                })
        }

    }



    render()
    {

        let serviceList;
        if(this.state.services) {
            serviceList = this.state.services.map((service,index) => (
                <option key={index} value={service.id}> {service.name} </option>
            ))
        }

        let availList;
        if(this.state.avails)
        {
            availList = this.state.avails.map((avail,index) =>
            {
                    if(avail.worker === this.state.id)
                       return  <li key={index}> Day: {numToDay(avail.day)} Time: {avail.hour}:{avail.minute} </li>
            })
        }

        const format="HH:mm";

        return(
            <div>
                <br/>
                <Form onSubmit={this.onSubmit}>

                    <h2> AVAIL MAKER FORM</h2>
                    <h4> Select Service</h4>

                    <select value={this.state.currentServiceId} name="currentServiceId" onChange={this.onChange}>
                        <option value={-1} disabled > Select a service: </option>
                        {serviceList}
                    </select>
                    {availList}
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
