import React, {Component} from 'react';
import {
    getAllBusiness, getAvailByService,
    getServiceByBusiness, getWorkerByService,
    tryCreateBooking
} from "../../actions/BusinessActions";
import {Button} from "react-bootstrap";
import {connect} from 'react-redux'
import {createDate, numToDay} from "../../utils/dateUtils";
import MyCal from "../Generics/myCal";
import WorkerDropDown from "../Generics/WorkerDropDown"


export class BookingCreator extends Component
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

            date: new Date(),
            dayOfWeek: undefined,
            dayOfMonth:undefined,
            month:undefined,
            year:undefined,

            canSubmit:false,
            successful:false,
            message:"",
        }

        this.onChangeNumber=this.onChangeNumber.bind(this);
        this.onClick=this.onClick.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
    }

    componentDidMount() {
        const date = this.state.date;
        getAllBusiness()
            .then(response =>
            {
                this.setState({
                    businesses: response.data,
                    dayOfWeek:date.getDay(),
                    dayOfMonth:date.getDate(),
                    month:date.getMonth(),
                    year:date.getFullYear()
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

    onChangeDate = date =>
    {
        console.log(date);
        let thisDay = date.getDay();
        let thisDate = date.getDate();
        const thisMonth = date.getMonth()+1;
        const thisYear = date.getFullYear();
        if(thisDay===0)
        {
            thisDay=7;
        }

        this.setState(
            {
            dayOfWeek:thisDay,
            dayOfMonth: thisDate,
            month: thisMonth,
            year: thisYear,}
            )
    }


    onClick = (e) =>
    {
        e.preventDefault();
        const currentAvail = this.state.availList[this.state.currentAvail];
        const myDate = createDate(this.state.year,this.state.month,this.state.dayOfMonth);
        console.log(myDate);
        const bookingRequest =
        {
            availabilityId: currentAvail.id,
            customerId:this.props.user.userId,
            date: myDate,
        }

        const serviceId = this.state.services[this.state.currentServiceId].id;
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
                        message: "Booking Fail, select a time without an existing booking!",
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

        const work = this.state.workerList;

        let availList;
        const avail = this.state.availList;

        if (avail) {
            const actualWorker = this.state.workerList[this.state.currentWorkerId].id;
            const chosenDay = this.state.dayOfWeek;
            availList = avail.map((avail, index) => {
                    if (avail.worker === actualWorker && avail.day===chosenDay)
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
                            <option value="-1" disabled>Select a business</option>
                            {businessList}
                        </select>
                        :
                        <p></p>
                    }


                    <h3 className="bookingCreatorDropdowns"> Service </h3>
                    {serv
                        ? <select name="currentServiceId" value={this.state.currentServiceId} onChange={this.onChangeNumber}>
                            <option value="-1" disabled> Please Select A Service:</option>
                            {servList} </select>
                        : <select>
                            <option value="-1"> Please Select A Service:</option>
                        </select>
                    }

                    <h3 className="bookingCreatorDropdowns" > Worker </h3>
                    {work
                       ? <WorkerDropDown workerList = {work}
                                         value={this.state.currentWorkerId}
                                         onChange={this.onChangeNumber}
                                         name="currentWorkerId" />
                        : <select>
                            <option value="-1" > Please Select A Worker:</option>
                        </select>
                    }
                    <br/>
                    <br/>

                    Please Select a day:
                    <MyCal value={this.state.date}
                           onChange={this.onChangeDate}
                           minDate={new Date()}
                    />

                    <h3 className="bookingCreatorDropdowns" > Availabilities </h3>
                    {avail
                        ? <select name="currentAvail" value={this.state.currentAvail} onChange={this.onChangeNumber}>
                            <option value="-1" disabled > Please Select an avail:</option>
                            {availList} </select>
                        : <select>
                            <option value="-1" > Please Select an avail:</option>
                        </select>
                    }

                </center>

                <center>

                    <div className="BookButton">
                        <br/>



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
