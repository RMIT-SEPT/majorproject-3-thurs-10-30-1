import React from "react";
import AGMEnav from "./AGMEnav";
import BookingList from "./BookingList";
import BookingCreator from "./BookingCreator";

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
        {customerName: 'Ali ', workerName: 'max ', service: 'haircut'},
    ]

    return(
        <div className="dashboardContainer">
            <AGMEnav links ={links}/>
            <BookingList bookings = {bookings}/>
            <BookingCreator/>
        </div>
    )
}