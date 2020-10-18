import React, {Component} from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import TimePicker from 'react-time-picker'
import {numToDay, timeToken} from "../../utils/dateUtils";
import {createNewAvail, getAvailByService, getServiceByWorker} from "../../actions/BusinessActions";
import {Redirect} from "react-router-dom";


//component to allow workers to create their availabilities for a given day of the week.
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

    //get all services for the logged in worker.
    componentDidMount() {
        const myId = this.state.id;
        getServiceByWorker(myId)
            .then(response => {
                this.setState(
                    {
                        services:response.data,
                    })
            });
    }

    //if currently selected service changes, re-contact the API to get THAT services list of avails.
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevState.currentServiceId!==this.state.currentServiceId ||
        prevState.message!== this.state.message)
        {
            getAvailByService(this.state.currentServiceId)
                .then(r =>
                {
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
            const timeAvailabilityRequest =
            {
                day: this.state.day,
                hour: hourToken,
                minute: minuteToken,
                workerId: this.state.id,
                length: this.state.duration,
            }

            createNewAvail(timeAvailabilityRequest,servId).then((response) =>
            {
                if(response)
                {
                    this.setState(
                        {
                            successful:true,
                            message:"Availability successfully added!",
                        });
                }
                else
                {
                   this.setState(
                       {
                           successful:false,
                           message:"There was an error. Please input a time with no existing availability"
                       })
                }
            })
        }

    }
    render()
    {
        if(!this.props.isLoggedIn)
        {
            return <Redirect to="/" />;
        }

        let serviceList;
        if(this.state.services) {
            serviceList = this.state.services.map((service,index) => (
                <option key={index} value={service.id}> {service.name} </option>
            ))
        }

        let availList;
        if(this.state.avails)
        {
            availList = this.state.avails.map((avail,index) => {
                    if(avail.worker === this.state.id)
                       return <div className = "workerAvailTimes">
                           Day: {numToDay(avail.day)} Time: {avail.hour}:{avail.minute}
                    </div>



            })
        }

        const format="HH:mm";

        return(

            <div className="availContainer">
                <div className= "workerAvailability">
                    <h2 className="workerAvailHeader">Set your Availability</h2>

                            <Form onSubmit={this.onSubmit} className="availForm">
                                <center>
                                <h4 className="workerAvailSetTitle"> Select Service</h4>
                                    <select className = "workerAvailDropDown" value={this.state.currentServiceId} name="currentServiceId" onChange={this.onChange}>
                                        <option value={-1} disabled > Select a service: </option>
                                        {serviceList}
                                    </select>
                                <br/>

                                <h4 className="workerAvailSetTitle"> Select Day </h4>
                                    <select className = "workerAvailDropDown" value={this.state.day} name="day" onChange={this.onChange} required>
                                        <option value={1}> Monday</option>
                                        <option value={2}> Tuesday</option>
                                        <option value={3}> Wednesday</option>
                                        <option value={4}> Thursday</option>
                                        <option value={5}> Friday</option>
                                        <option value={6}> Saturday</option>
                                        <option value={7}> Sunday</option>
                                    </select>
                                <br/>

                                <h4 className="workerAvailSetTitle"> Select Start Time </h4>
                                    {/*cool timepicker library from react*/}
                                    <TimePicker
                                        className = "workerAvailDropDown"
                                        onChange={this.onChangeTime}
                                        value={this.state.time}
                                        format={format}
                                        disableClock={true}
                                        name="startTime"
                                        required>
                                    </TimePicker>
                                <br/>

                                <h4 className="workerAvailSetTitle"> Input Duration </h4>
                                    <input
                                        className = "workerAvailDropDown"
                                        type="number"
                                        required value={this.state.duration}
                                        name="duration"
                                        onChange={this.onChange}
                                    />
                                <br/>

                                <Button className = "workerAvailDropDown" type="submit"> Make Availability </Button>
                                    {this.state.message && (
                                        <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                            {this.state.message}
                                        </div>
                                    )}
                                </center>
                            </Form>
                </div>

                <div className="availList">
                    <h2 className="workerAvailHeader">View Your Current Availability:</h2>
                    <center>
                        {availList}
                    </center>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    const {isLoggedIn} = state.auth;
    return {
        user,
        isLoggedIn,
    };
}

export default connect(mapStateToProps) (WorkerAvailabilities);
