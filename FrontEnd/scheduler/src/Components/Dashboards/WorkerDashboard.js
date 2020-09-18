import React from "react";

import AGMEnav from "../Generics/AGMEnav";
import WorkerBookingList from "../Bookings/WorkerBookingList";


export default function WorkerDashboard(props)
{
    //get links based off of what the account type iss
    let links = [
        {label: 'Home', link: '/'},
        {label: 'Testing a Link', link: '/dashboard'},
        {label: 'Profile', link: '/profile'},
        {label: 'Sign-out', link: '/'}  
    ]

    let bookings = [
        {workerName: 'Ali ', service: "Ali's Hairdresser ", time: "13:30 ", date: "04/10"},
        {workerName: 'Max ', service: "Clearing Max ", time: "8:00 ", date: "10/10"},
        {workerName: 'Fady ', service: "Fady Car-Mechanic ", time: "15:30 ", date: "12/10"},
        {workerName: 'Zac ', service: "IT Services ", time: "11:15 ", date: "16/10"}, 
        {workerName: 'Ali ', service: "Ali's Hairdresses ", time: "18:45 ", date: "20/10"},
    ]

    return(
        <div className="dashboardContainer2">
            <AGMEnav links ={links}/>
               {/*Add welcome Username*/}
            <WorkerBookingList bookings = {bookings}/>


        </div>
    )
}