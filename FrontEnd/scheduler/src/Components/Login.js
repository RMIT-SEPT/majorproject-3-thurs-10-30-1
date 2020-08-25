import React, {Component, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import '../App.css';
import loginButton from "./loginButton";
import LoginButton from "./loginButton";

export default function Login(props)
    {
        const [state , newState] = useState({
            email : "",
            password : ""
        })

        const handleChange = (e) => {
            const {id , value} = e.target
            newState(prevState => ({
                ...prevState,
                [id] : value
            }))
        }

        const handleSubmit=
            {

            }


        return(
            <div className="loginContainer">
        <Form className="mr-auto" onSbmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={state.email} onChange={handleChange} id="email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" id ="password" value={state.password} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Link to="/register" className ="regLink"> No Account? Register here </Link>
            <br/>
         <LoginButton />
        </Form>
            </div>
        )
}
