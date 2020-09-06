import React from "react";
import AGMEnav from "./AGMEnav";
import DarkButton from "./DarkButton";

function Registration()
{
    let links = [
        {label: 'Home', link: '/'},
        {label: 'Testing a Link', link: '/'},
    ]
    let label = {label: 'Register', link: '/'}
    return (
        <div>
        <AGMEnav links={links} />
        <div> THIS IS WHERE THE REG FORM WILL BE</div>
            <form>
            <div>
                going to put fields here
            </div></form>

            <DarkButton label={label} />
        </div>
    )
}

export default Registration;