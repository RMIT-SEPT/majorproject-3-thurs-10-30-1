import React, {Component} from "react";

import BookingCreator from "../Bookings/BookingCreator";
import AGMEnav from "../Generics/AGMEnav";
import BookingList from "../Bookings/BookingList";
import {getCurrentUser, isLoggedIn} from "../../actions/userActions";

class Dashboard extends Component
{
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
    const loggedIn = isLoggedIn();
    const user = getCurrentUser();
    return (

        <div className="dashboardContainer">
            {loggedIn ? <p>{user.name}</p>: <p> No user</p>}
            <AGMEnav />

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