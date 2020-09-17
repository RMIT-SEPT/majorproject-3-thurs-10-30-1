import React from "react";

import AGMEnav from "../Generics/AGMEnav";


export default function WorkerDashboard(props)
{
    //get links based off of what the account type is
    let links = [
        {label: 'Home', link: '/'},
        {label: 'Testing a Link', link: '/dashboard'},
        {label: 'Profile', link: '/profile'},
        {label: 'Sign-out', link: '/'}  
    ]

    return(
        <div className="dashboardContainer2">
            <AGMEnav links ={links}/>

        </div>
    )
}