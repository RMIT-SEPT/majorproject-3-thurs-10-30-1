import React, {Component} from 'react';
import {getAllBusiness, getAvailByService, getServiceByBusiness} from "../../actions/BusinessActions";
import {Button} from "react-bootstrap";


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
                currentAvail:-1
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
            console.log("there was a change of ID: " + this.state.currentId);
            getServiceByBusiness(this.state.currentId).then(response => {
                this.setState({
                    services: response.data,
                    currentServiceId:-1,
                    workerList: undefined,
                    availList:undefined,
                });
                console.log(" Services by chose business");
                console.log(this.state.services);
            })

        }
        if (prevState.currentServiceId !== this.state.currentServiceId) {
            console.log("there was a change of service to: " + this.state.currentServiceId);
            if(this.state.currentServiceId>=0)
            {
                this.setState({
                    workerList: this.state.services[this.state.currentServiceId].workers,
                    availList:undefined
                });
                console.log(" Workers by chosen service:");
                console.log(this.state.services[this.state.currentServiceId].workers);
            }
        }
        if (prevState.currentWorkerId !== this.state.currentWorkerId) {
            console.log("there was a change of Worker to: " + this.state.currentServiceId);
            if(this.state.currentWorkerId>=0)
            {
                this.setState({
                    availList:this.state.services[this.state.currentServiceId].availablities,
                });
                console.log("all Avails: ");
                console.log(this.state.availList);
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
        const booking =
            {
                business: this.state.businesses[this.state.currentId].id,
                service: this.state.services[this.state.currentServiceId].id,
                Worker: this.state.workerList[this.state.currentWorkerId].id,
                avail: this.state.availList[this.state.currentAvail].id,
            }
            console.log("ABOUT TO MAKE A BOOKING:");
        console.log(booking);
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
            console.log("ACTUAL WORKER");
            console.log(actualWorker);
            availList =  avail.map((avail,index) => {
                if(avail.workedId===actualWorker)
                    return <option key={avail.id} value={index}> Day: {avail.day} Hour:{avail.hour} </option>

                return <option> </option>
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

                <Button onClick={this.onClick}> Book</Button>
            </div>
        )
    }
}

export default BookingCreator;
