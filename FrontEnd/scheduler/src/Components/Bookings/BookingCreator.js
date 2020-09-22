import React, {Component} from 'react';
import DarkButton from "../Generics/DarkButton";
import {getAllBusiness} from "../../actions/business";
import {Navbar} from "react-bootstrap";


class BookingCreator extends Component
{
    constructor(props) {
        super(props);
        this.state=
        {
            businesses: [],
            currentbiz: ""
        }
    }

    componentDidMount() {
       getAllBusiness()
            .then(response => {
                this.setState({
                    businesses: response.data
                });
            })
    }

    //onclick sets the selected service as the session currentService
    render()
    {
        let biz = this.state.businesses[0];
        let biz2 = this.state.businesses[1];
        let label = {label: 'Show All Available', link: '/booking/worker'}

    return (
        <div className = "bookingCreator">
        <h2 className="bookingListHeader">Book a New Service</h2>
            {biz
                ? <select name = "bizname" onChange={this.onChange} >
                    <option> {biz.name}</option>
                    <option>{biz2.name} </option>
                </select>
                : <p></p>}

         <DarkButton label={label} />
         </div>
    )
}
}

export default BookingCreator;
