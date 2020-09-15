import React, {Component} from "react";
import AGMEnav from "../Generics/AGMEnav";
import {userCreate} from "../../actions/userActions";
import Form from "react-bootstrap/Form";

class Registration extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
            {
                name:"",
                username:"",
                contactNumber:0,
                email:"",
                password:""
            };
        this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    onChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit= async (e) =>
    {
        e.preventDefault();
        const user =
        {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            contactNumber: this.state.contactNumber,
            email: this.state.email,
            accountType:2
        }
        const res = await userCreate(user);
        console.log(res.data);
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="wholeReg">
                <AGMEnav loggedIn={this.props.loggedIn}/>
                <div className="regFormDiv">
                    <h1 className="myHeader"> Register Here!</h1>
                    <Form className="mr-auto" onSubmit={this.handleSubmit}>
                        <div className="transparentDiv">
                            <Form.Group>
                                <Form.Control type="text" placeholder="Username: " value={this.state.username} onChange={this.onChange} name ="username"/>

                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChange} name="email"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="text" placeholder="Person Name: " value={this.state.name} onChange={this.onChange} name="name"/>
                            </Form.Group>

                            <Form.Group >
                                <Form.Control type="number" placeholder="Contact Number: " value={this.state.contactNumber} onChange={this.onChange} name="contactNumber"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                            </Form.Group>
                        </div>
                        <input type="submit" value="Register"/>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Registration;