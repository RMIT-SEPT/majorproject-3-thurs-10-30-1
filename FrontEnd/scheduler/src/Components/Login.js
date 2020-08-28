import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import DarkButton from "./DarkButton";

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

        const handleSubmit= (e) =>
        {

        }

        let label = {label: 'Login', link: '/dashboard'}

        return(
            <div className="loginContainer">
                <h1 className="myHeader"> SIGN IN</h1>
        <Form className="mr-auto" onSubmit={handleSubmit}>
            <div className="transparentDiv">
            <Form.Group controlId="formBasicEmail">
                {/*<Form.Label>Email address</Form.Label>*/}
                <Form.Control type="email" placeholder="Enter email" value={state.email} onChange={handleChange} id="email" />
            </Form.Group>
            <br/>

            <Form.Group controlId="formBasicPassword">
                {/*<Form.Label>Password</Form.Label>*/}
                <Form.Control type="password" placeholder="Password" id="password" value={state.password} onChange={handleChange}/>
            </Form.Group>
            <br/>
            </div>
            <Link to="/register" className="regLink"> No Account? Register here! </Link>
         <DarkButton label={label} />
        </Form>
            </div>
        )
}
