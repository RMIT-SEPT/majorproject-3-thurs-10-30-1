import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import MyError from "../Generics/MyError";
import { register } from "../../actions/auth";
import {connect} from 'react-redux'

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
                password:"",
                error:false
            };
        this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    onChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value});
    }


//     const res = await userCreate(user,this.props.history);
//     if(!res)
// {
//     this.setState(
//     {error:"ERROR REGISTERING"}
// )
//     this.resetState();
// }
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
            error: false,
            successful: false,
        }
        //if true all good
        this.setState({
            successful: false,
        });
        this.props.dispatch(register(user,this.props.history))
            .then(() => {
                this.setState({
                    successful: true,
                });
            })
            .catch(() => {
                this.setState({
                    successful: false,
                });
            });
    }

    resetState()
    {
        this.setState(
            {
                name:"",
                username:"",
                contactNumber:0,
                email:"",
                password:""
            }
        )
    }

    render() {
        const { message } = this.props;
        return (
            <div className="wholeReg">
                {this.state.error ? <MyError error={this.state.error} /> : <p></p>}
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

                        {message && (
                            <div className="form-group">
                                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <input type="submit" value="Register"/>
                    </Form>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(Registration);