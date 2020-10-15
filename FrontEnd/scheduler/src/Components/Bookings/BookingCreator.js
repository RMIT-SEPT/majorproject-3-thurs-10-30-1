import React, {Component} from 'react';
import {
    getAllBusiness, getAvailByService,
    getServiceByBusiness, getServiceById, getWorkerByService,
    tryCreateBooking
} from "../../actions/BusinessActions";
import {Button} from "react-bootstrap";
import {connect} from 'react-redux'
import {createDate, numToDay} from "../../utils/dateUtils";
import {getWorker} from "../../actions/userActions";


class BookingCreator extends Component
{
    constructor(props) {
        super(props);
        this.state=
        {
            businesses: undefined,
            services:undefined,
            workerList: undefined,
            availList:undefined,

            currentId:-1,
            currentServiceId:-1,
            currentWorkerId:-1,
            currentAvail:-1,
            canSubmit:false,
            successful:false,
            message:"",
        }

        this.onChangeNumber=this.onChangeNumber.bind(this);
        this.onClick=this.onClick.bind(this);
    }

    componentDidMount() {
        getAllBusiness()
            .then(response =>
            {
                this.setState({
                    businesses: response.data,
                });
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (prevState.currentId !== this.state.currentId)
        {
            console.log(this.state.businesses);
            const id = this.state.businesses[this.state.currentId].id;
            getServiceByBusiness(id)
                .then(resp => {
                    console.log("loggin service resp");
                    console.log(resp.data);
                    this.setState(
                        {
                            services: resp.data,
                            workerList: undefined,
                            availList: undefined,
                            canSubmit: false,
                            currentServiceId: -1,
                        });
                })
        }

        if (prevState.currentServiceId !== this.state.currentServiceId)
        {
            if(this.state.currentServiceId>=0)
            {
                const id = this.state.services[this.state.currentServiceId].id;
                getWorkerByService(id)
                    .then(resp => {
                        console.log("logging worker resp:");
                        console.log(resp.data);
                        this.setState({
                            workerList: resp.data,
                            currentWorkerId:-1,
                            availList:undefined,
                            canSubmit:false
                        });
                    })
            }

        }

        if (prevState.currentWorkerId !== this.state.currentWorkerId) {
            if(this.state.currentWorkerId>=0)
            {
                const id = this.state.services[this.state.currentServiceId].id;
                getAvailByService(id)
                    .then(resp => {
                        console.log("logging avail resp");
                        console.log(resp.data);
                        this.setState({
                            availList:resp.data,
                            currentAvail:-1,
                            canSubmit:false
                        });
                    })
            }
        }

        if (prevState.currentAvail !== this.state.currentAvail) {
            if (this.state.currentAvail >= 0) {
                this.setState({
                    canSubmit: true
                });
            }
        }
    }

    onChangeNumber = (e) =>
    {
        this.setState({[e.target.name]: parseInt(e.target.value)});
    }


    onClick = (e) =>
    {
        e.preventDefault();
        const currentAvail = this.state.availList[this.state.currentAvail];
        const myDate = createDate(currentAvail.hour,currentAvail.minute);
        const bookingRequest =
        {
            availabilityId: currentAvail.id,
            customerId:this.props.user.userId,
            date: myDate,
        }
        const serviceId = this.state.services[this.state.currentServiceId].id;
        console.log("making a booking with this request: ");
        console.log(bookingRequest);
        console.log("and this service: ")
        console.log(serviceId);
        tryCreateBooking(bookingRequest,serviceId).then
        ((response)=>
        {
            if(response)
            {
                console.log(response);
                this.setState(
                    {
                        message: "Booking Success!",
                        successful: true,
                    })
            }

            else
            {
                this.setState(
                    {
                        message: "Booking FAIL!",
                        successful: false,
                    })
            }

        })

    }
    render()
    {
        let businessList;
        const biz = this.state.businesses;
        if (biz)
        {
            businessList = biz.map((business,index) => (
                <option key={index} value={index}> {business.name} </option>
            ))
        }

        let servList;
        const serv = this.state.services;

        if (serv)
        {
            servList = serv.map((service, index) =>(
                   <option key={service.id} value={index}> {service.name} </option>
            ))
        }

        let workerList;
        const work = this.state.workerList;
        if (work)
        {
            workerList = work.map((worker, index) => (
                    <option key={worker.id} value={index}> {worker.user.name} </option>
            ))
        }

        let availList;
        const avail = this.state.availList;

        if (avail) {
            console.log("logging avail in availLIst");
            console.log(avail);
            const actualWorker = this.state.workerList[this.state.currentWorkerId].id;
            console.log(actualWorker);
            availList = avail.map((avail, index) => {
                    if (avail.worker === actualWorker)
                        return <option key={avail.id} value={index}>Day: {numToDay(avail.day)}
                        Hour: {avail.hour}:{avail.minute} </option>

                }
            )
        }

        return (
            <div className = "bookingCreator">
                <h2 className="bookingListHeader">Book a New Service</h2>

                <center>
                    <h3 className="bookingCreatorDropdowns" > Business </h3>
                    {biz
                        ? <select name="currentId" value={this.state.currentId} onChange={this.onChangeNumber}>
                            <option value="-1">Select a business</option>
                            {businessList}
                        </select>
                        :
                        <p></p>
                    }


                    <h3 className="bookingCreatorDropdowns"> Service </h3>
                    {serv
                        ? <select name="currentServiceId" value={this.state.currentServiceId} onChange={this.onChangeNumber}>
                            <option value="-1" > PLEASE Select A Service:</option>
                            {servList} </select>
                        : <select>
                            <option value="-1" > Please Select A Service:</option>
                        </select>
                    }

                    <h3 className="bookingCreatorDropdowns" > Worker </h3>
                    {work
                        ? <select name="currentWorkerId" value={this.state.currentWorkerId} onChange={this.onChangeNumber}>
                            <option value="-1" > PLEASE Select A Worker:</option>
                            {workerList} </select>
                        //? <WorkerDropDown onChange={this.onChangeNumber} value={this.state.currentWorkerID} workerList={this.state.workerList}/>
                        : <select>
                            <option value="-1" > Please Select A Worker:</option>
                        </select>
                    }

                    <h3 className="bookingCreatorDropdowns" > Availabilities </h3>
                    {avail
                        ? <select name="currentAvail" value={this.state.currentAvail} onChange={this.onChangeNumber}>
                            <option value="-1" > Please Select an avail:</option>
                            {availList} </select>
                        : <select>
                            <option value="-1" > Please Select an avail:</option>
                        </select>
                    }

                </center>

                <center>
                    <div className="BookButton">
                        {this.state.canSubmit
                            ?
                            <Button onClick={this.onClick}> Book</Button>
                            : <Button disabled> Book</Button>
                        }

                        {this.state.message && (
                            <div className="form-group">
                                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </div>
                </center>

            </div>
        )
    }


}

function mapStateToProps(state) {
    const {user} = state.auth;
    const {accountType}= state.accountType;
    return {
        user,
        accountType,
    };
}

export default connect (mapStateToProps) (BookingCreator);
