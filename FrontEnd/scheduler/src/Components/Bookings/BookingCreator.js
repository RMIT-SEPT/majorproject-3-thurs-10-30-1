import React, {Component} from 'react';
import DarkButton from "../Generics/DarkButton";


class BookingCreator extends Component
{
    //onclick sets the selected service as the session currentService
    render()
    {
        //getAllServices from the database
        let services = this.props.services.map((service) =>
        {
            return (<option value={service.businessName}>{service.businessName} </option>);

        });

        let label = {label: 'Show All Available', link: '/booking/worker'}

    return (
        <div className = "bookingCreator">
        <h2 className="bookingListHeader">Book a New Service</h2>
        <select className = "availableServices" name="Available Services">
            {services}
        </select>
         <DarkButton label={label} />
         </div>
    )
}
}

export default BookingCreator;
