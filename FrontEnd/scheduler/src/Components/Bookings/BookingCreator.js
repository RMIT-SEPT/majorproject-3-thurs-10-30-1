import React, {Component} from 'react';
import DarkButton from "../Generics/DarkButton";
import {getAllBusiness} from "../../actions/business";


class BookingCreator extends Component
{
    //onclick sets the selected service as the session currentService
    render()
    {
        //getAllServices from the database

        let businesses = getAllBusiness().then((response) => {
            console.log("logging response");
            console.log(response.id);
            console.log("logging response data");
            console.log(response.data);

            return <p name={response.name}> response.name </p>
        });

        let label = {label: 'Show All Available', link: '/booking/worker'}

    return (
        <div className = "bookingCreator">
        <h2 className="bookingListHeader">Book a New Service</h2>
        <select className = "availableServices" name="Available Services">
            {/*{businesses}*/}
        </select>

         <DarkButton label={label} />
         </div>
    )
}
}

export default BookingCreator;
