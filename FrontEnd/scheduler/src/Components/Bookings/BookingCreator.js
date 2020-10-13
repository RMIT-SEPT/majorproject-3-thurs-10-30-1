import React, {Component} from 'react';
import {
    getAllBusiness,
    getServiceByBusiness,
    tryCreateBooking
} from "../../actions/BusinessActions";
import {Button} from "react-bootstrap";
import {connect} from 'react-redux'
import {createDate, numToDay} from "../../utils/dateUtils";


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

                currentId:0,
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
            .then(response => {
                this.setState({
                    businesses: response.data,
                });
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (prevState.currentId !== this.state.currentId) {
            getServiceByBusiness(this.state.currentId).then(response => {
                this.setState({
                    services: response.data,
                    workerList: undefined,
                    availList:undefined,
                    canSubmit:false,
                    currentServiceId:-1,

                });
            })

        }

        if (prevState.currentServiceId !== this.state.currentServiceId) {
            if(this.state.currentServiceId>=0)
            {
                this.setState({
                    workerList: this.state.services[this.state.currentServiceId].workers,
                    currentWorkerId:-1,
                    availList:undefined,
                    canSubmit:false
                });
            }

        }

        if (prevState.currentWorkerId !== this.state.currentWorkerId) {
            if(this.state.currentWorkerId>=0)
            {
                this.setState({
                    availList:this.state.services[this.state.currentServiceId].availablities,
                    currentAvail:-1,
                    canSubmit:false
                });
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
        console.log(myDate);
        const bookingRequest =
            {
                id: currentAvail.id,
                date: myDate,
            }

        const serviceId = this.state.services[this.state.currentServiceId].id;
        tryCreateBooking(bookingRequest,serviceId).then
        ((response)=>
        {
            if(response.data==="Booking made!")
            {
                console.log(response.data);
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
                        message: "Booking Failure!",
                        successful: false,
                    })
            }
        })

    }

    render()
    {
        let businessList;
        const biz = this.state.businesses;
        if(biz)
        {
            businessList =  biz.map(business => (
                <option key={business.id} value={business.id}> {business.name} </option>
            ))
        }

        let servList;
        const serv = this.state.services;
        if(serv)
        {
            servList =  serv.map((service,index) => (
                <option key={service.id} value={index}> {service.name} </option>
            ))
        }

        let workerList;
        const work = this.state.workerList;
        if(work)
        {
            workerList =  work.map((worker,index) => {
                return <option key={worker.id} value={index}> {worker.user.name} </option>
            })
        }

        let availList;
        const avail = this.state.availList;
        if(avail)
        {
            const actualWorker = this.state.workerList[this.state.currentWorkerId].id;
            availList =  avail.map((avail,index) => {
                    if(avail.workedId===actualWorker)
                        return <option key={avail.id} value={index}> Day: {numToDay(avail.day)} Hour: {avail.hour}:{avail.minute} </option>

                }
            )
        }


        return (
            <div className = "bookingCreator">
                <h2 className="bookingListHeader">Book a New Service</h2>

                {biz
                    ? <select name="currentId" value={this.state.currentId} onChange={this.onChangeNumber}>
                        <option value="-1" >Select a business </option>
                        {businessList}
                    </select>

                    : <p></p>
                }
                <br/>
                {serv
                    ? <select name="currentServiceId" value={this.state.currentServiceId} onChange={this.onChangeNumber}>
                        <option value="-1" > Please Select A Service:</option>
                        {servList} </select>

                    : <select>
                        <option value="-1" > Please Select A Service:</option>
                    </select>
                }
                <br/>
                {work
                    ? <select name="currentWorkerId" value={this.state.currentWorkerId} onChange={this.onChangeNumber}>
                        <option value="-1" > Please Select A Worker:</option>
                        {workerList} </select>

                    : <select>
                        <option value="-1" > Please Select A Worker:</option>
                    </select>
                }
                <br/>
                {avail
                    ? <select name="currentAvail" value={this.state.currentAvail} onChange={this.onChangeNumber}>
                        <option value="-1" > Please Select an avail:</option>
                        {availList} </select>

                    : <select>
                        <option value="-1" > Please Select an avail:</option>
                    </select>
                }
                <br/>

                {
                    this.state.canSubmit
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
