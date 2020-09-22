import React from "react";
import AGMEnav from "./AGMEnav";

export default function Dashboard(props)
{
    //get links based off of what the account type is
    let links = [
        {label: 'Home', link: '/'},
        {label: 'Testing a Link', link: '/'},
        {label: 'Profile', link: '/profile'},
        {label: 'Sign-out', link: '/'}
    ]

    return(
        <div>
            <AGMEnav links ={links}/>
            <div> This is a dashboard</div>
        </div>
    )
}