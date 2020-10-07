import React, {Component} from 'react';
import {getAllBusiness, getServiceByBusiness} from "../../actions/BusinessActions";
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
            currentId:0,
            currentServiceId:-1,
            currentWorkerId:-1
        }
        this.onChangeNumber=this.onChangeNumber.bind(this);
        this.showServices=this.showServices.bind(this);
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
                });
                console.log(" Services by chose business");
                console.log(this.state.services);
            })

        }
        if (prevState.currentServiceId !== this.state.currentServiceId) {
            console.log("there was a change of service ID: " + this.state.currentServiceId);
            if(this.state.currentServiceId>=0)
            {
            this.setState({
                workerList: this.state.services[this.state.currentServiceId].workers
            });
            console.log(" Workers by chosen service:");
            console.log(this.state.services[this.state.currentServiceId].workers);
        }
        }
    }

    onChangeNumber = (e) =>
    {
        this.setState({[e.target.name]: parseInt(e.target.value)});
    }

    showServices = (e) =>
    {
        localStorage.setItem("currentBusiness", this.state.currentId);
    }

    render()
    {
        let realBiz;
        const biz = this.state.businesses;
       if(biz)
       {
            realBiz =  biz.map(business => (
                <option key={business.id} value={business.id}> {business.name} </option>
           ))
       }

        let realServ;

        const serv = this.state.services;
        if(serv)
        {
            realServ =  serv.map((service,index) => (
                <option key={service.id} value={index}> {service.name} </option>
            ))
        }

        let realWork;
        const work = this.state.workerList;
        if(work)
        {
            realWork =  work.map((worker,index) => (
                <option key={worker.id} value={index}> {worker.user.name} </option>
            ))
        }


    return (
        <div className = "bookingCreator">
            <h2 className="bookingListHeader">Book a New Service</h2>
        <center>
            <h3 className="bookingCreatorDropdowns" > Business </h3>
            {biz
                ? <select name="currentId" value={this.state.currentId} onChange={this.onChangeNumber}>
                    <option value="-1" >Select a business </option>
                    {realBiz}
                </select>
                :
                <p></p>
            }

            <h3 className="bookingCreatorDropdowns"> Service </h3>
            {serv
                ? <select name="currentServiceId" value={this.state.currentServiceId} onChange={this.onChangeNumber}>
                    <option value="-1" > Please Select A Service:</option>
                    {realServ} </select>

                : <select>
                    <option value="-1" > Please Select A Service:</option>
                </select>
            }

            <h3 className="bookingCreatorDropdowns" > Worker </h3>
            {work
                ? <select name="currentWorkerId" value={this.state.currentWorkerId} onChange={this.onChangeNumber}>
                    <option value="-1" > Please Select A Worker:</option>
                    {realWork} </select>

                : <select>
                    <option value="-1" > Please Select A Worker:</option>
                </select>
            }
            <h3 className="bookingCreatorDropdowns" > Availabilities </h3>
            <select>
                <option>Availabilities</option>
            </select>
            <br/>

            <Button className="BookButton" onClick={this.onclick}> Book</Button>
        </center>
        </div>

    )
}
}

export default BookingCreator;
