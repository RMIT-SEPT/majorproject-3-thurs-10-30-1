import React from "react";

import BookingCreator from "../Bookings/BookingCreator";
import AGMEnav from "../Generics/AGMEnav";
import BookingList from "../Bookings/BookingList";

export default function Dashboard(props)
{
    //get links based off of what the account type is
    let links = [
        {label: 'Home', link: '/'},
        {label: 'Testing a Link', link: '/'},
        {label: 'Profile', link: '/profile'},
        {label: 'Sign-out', link: '/'}  
    ]

    let bookings = [
        {customer: 'Test ',worker: 'Ali ', service: "Ali's Hairdresser ", start_time: "13:30 ", end_time: "13:30"},
        {customer: 'Test ',worker: 'Max ', service: "Clearing Max ", start_time: "8:00 ", end_time: "8:00"},
        {customer: 'Test ',worker: 'Fady ', service: "Fady Car-Mechanic ", start_time: "15:30 ", end_time: "15:30"},
        {customer: 'Test ',worker: 'Zac ', service: "IT Services ", start_time: "11:15 ", end_time: "11:15"}, 
        {customer: 'Test ',worker: 'Ali ', service: "Ali's Hairdresses ", start_time: "18:45 ", end_time: "18:45"},
    ]

    let services = [
        {businessName: 'Business1'} ,
        {businessName: 'Business2'},
        {businessName: 'Business3'}
    ]

    return(
        <div className="dashboardContainer">
            <AGMEnav links ={links}/>

            {/*if customer*/}
            <BookingList bookings = {bookings}/>
            <BookingCreator services = {services}/>

            {/*if admin*/}
            {/*if worker*/}

        </div>
    )
}