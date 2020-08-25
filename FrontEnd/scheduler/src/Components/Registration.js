import React from "react";
import AGMEnav from "./AGMEnav";

function Registration()
{
    let links = [
        {label: 'Home', link: '/'},
        {label: 'Testing a Link', link: '/'},
        {label: 'Register', link: '/register'}
    ]
    return (
        <div>
        <AGMEnav links={links} />
        <div> THIS IS WHERE THE REG WILL BE</div>
        </div>
    )
}

export default Registration;