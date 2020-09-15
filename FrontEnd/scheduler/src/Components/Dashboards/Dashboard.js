import React, {Component} from "react";

import BookingCreator from "../Bookings/BookingCreator";
import AGMEnav from "../Generics/AGMEnav";
import BookingList from "../Bookings/BookingList";

class Dashboard extends Component
{
    constructor(props)
    {
        super(props);
    }

render() {
    let bookings = [
        {workerName: 'Ali ', service: "Ali's Hairdresser ", time: "13:30 ", date: "04/10"},
        {workerName: 'Max ', service: "Clearing Max ", time: "8:00 ", date: "10/10"},
        {workerName: 'Fady ', service: "Fady Car-Mechanic ", time: "15:30 ", date: "12/10"},
        {workerName: 'Zac ', service: "IT Services ", time: "11:15 ", date: "16/10"},
        {workerName: 'Ali ', service: "Ali's Hairdresses ", time: "18:45 ", date: "20/10"},
    ]
    let services = [
        {businessName: 'Business1'} ,
        {businessName: 'Business2'},
        {businessName: 'Business3'}
    ]

    return (
        <div className="dashboardContainer">
            <h1>Status: {this.props.loggedIn} </h1>
            <h1>User: {this.props.user} </h1>
            <AGMEnav loggedIn={this.props.loggedIn}/>
            {/*if customer*/}
            <BookingList bookings={bookings}/>
            <BookingCreator services={services}/>

            {/*if admin*/}
            {/*if worker*/}

        </div>
    )
    }
}

export default Dashboard