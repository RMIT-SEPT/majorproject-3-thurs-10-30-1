import React, {Component} from 'react';
import {getAllBusiness} from "../../actions/bookings";


class BookingCreator extends Component
{
    constructor(props) {
        super(props);
        this.state=
        {
            businesses: undefined,
            currentId:0,
        }
        this.onChangeNumber=this.onChangeNumber.bind(this);
        this.showServices=this.showServices.bind(this);
    }

    componentDidMount() {
       getAllBusiness()
            .then(response => {
                this.setState({
                    businesses: response.data
                });
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevState.currentId!==this.state.currentId)
        {
            console.log("there was a change of ID: " + this.state.currentId);
        }
    }

    onChangeNumber = (e) =>
    {
        this.setState({[e.target.name]: parseInt(e.target.value)});L

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
                <option value={business.id}> {business.name} </option>
           ))
       }

    return (
        <div className = "bookingCreator">
        <h2 className="bookingListHeader">Book a New Service</h2>

            {biz
                ? <select name="currentId" value={this.state.currentId} onChange={this.onChangeNumber}> {realBiz} </select>

                : <p></p>
            }

            <br/>
            <select>
                <option>Services</option>
            </select>
            <br/>
            <select>
                <option>Availabilities</option>
            </select>
            <br/>
            <select>
                <option>Workers</option>
            </select>
            <br/>

            <input type="Button" value="Book" onClick={this.showServices}/>
         </div>
    )
}
}

export default BookingCreator;
