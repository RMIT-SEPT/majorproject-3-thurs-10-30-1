import React from "react";
import AGMEnav from "./AGMEnav";
import RegForm from "./RegForm";

export default function Registration(props)
{
        let links =
            [
                {label: 'Home', link: '/'},
                {label: 'Testing a Link', link: '/'},
            ]

        return (
            <div className="wholeReg">
                <AGMEnav links={links}/>
                <RegForm  />
            </div>
        )

}
