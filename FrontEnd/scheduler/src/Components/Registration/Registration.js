import React from "react";
import RegForm from "./RegForm";
import AGMEnav from "../Generics/AGMEnav";

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
