import React, {Component} from 'react';
import DarkButton from "../Generics/DarkButton";


class BookingCreator extends Component
{
    render() {
        let services = this.props.services.map((service) =>
        {
            return (<option value={service.businessName}>{service.businessName} </option>);

        });
        let label = {label: 'Show All Available', link: '/'}

    return (
        <div className = "bookingCreator">
        <h2 className="pageHeader">Book a New Service</h2>
        <select className = "availableServices" name="Available Services">
            {services}
        </select>
         <DarkButton label={label} />
         </div>
    )
}
}

export default BookingCreator;
