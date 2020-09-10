import Form from "react-bootstrap/Form";
import React, {Component} from "react";
import {userCreate} from "../../actions/userActions";

class RegForm extends Component
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

    handleSubmit= (e) =>
    {
        e.preventDefault();
        const user =
            {
                name: this.state.name,
                username: this.state.username,
                contactNumber: this.state.contactNumber,
                email: this.state.email,
                password: this.state.password
            }
        userCreate(user).then(value =>
        {
            // value is the return of userLogin
            console.log(`value is: ${value}`);
        }
        );
    }

    render() {
        return (
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
                            <Form.Control type="text" placeholder="Contact Number: " value={this.state.contactNumber} onChange={this.onChange} name="contactNumber"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                        </Form.Group>
                    </div>
                    <input type="submit" value="Register"/>
                </Form>
            </div>
        )
    }
}

export default RegForm;