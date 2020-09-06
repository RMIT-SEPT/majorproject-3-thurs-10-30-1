import React, {Component} from "react";
import AGMEnav from "./AGMEnav";
import DarkButton from "./DarkButton";
import {userLogin} from "../actions/userActions";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import RegForm from "./RegForm";

class Registration extends Component
{
    constructor(props)
    {
        super(props);
    }

    render() {
        let label = {label: 'Register', link: '/'};

        let links =
            [
                {label: 'Home', link: '/'},
                {label: 'Testing a Link', link: '/'},
            ]

        return (
            <div>
                <AGMEnav links={links}/>
                <div className="regFormDiv">
                <RegForm/>
                </div>
            </div>
        )
    }
}

export default Registration;