import React, {Component, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

function Login(props)
    {
        const [state , setState] = useState({
            email : "",
            password : ""
        })
        const handleChange = (e) => {
            const {id , value} = e.target
            setState(prevState => ({
                ...prevState,
                [id] : value
            }))
        }

        return(
            <div className="loginContainer">
        <Form className="mr-auto">
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
            <Link to="/register"> No Account? Register here!</Link>
            <br/>
            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
            </div>
        )
}

export default Login;