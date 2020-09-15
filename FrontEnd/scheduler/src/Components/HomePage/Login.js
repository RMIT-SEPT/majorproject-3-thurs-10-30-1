import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import {userLogin} from "../../actions/userActions";
import MyError from "../Generics/MyError";



class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
            {
                email:"",
                password:"",
                error: false
            };
            this.onChange=this.onChange.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
    }

    onChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit= async (e) => {

        //send the username and password to the backend to be verified
        e.preventDefault();
        const details =
        {
            identifier: this.state.email,
            password: this.state.password
        }

        //error checking before
        const res = await userLogin(details);
        if (res.data.email === this.state.email) {
            console.log("its good");
            this.setState(
                {error: false}
            )
            this.props.handleAuth(res.data);
        }
        else
        {
            console.log("run some errors")
            this.setState(
                {error: true}
        )
        }

    }
        render() {
            return (
                <div className="loginContainer">
                    <h1 className="myHeader"> SIGN IN</h1>

                    {this.state.error ? <MyError /> : <p></p>}

                    <Form className="mr-auto" onSubmit={this.handleSubmit}>

                        <div className="transparentDiv">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email}
                                              onChange={this.onChange} name="email"/>
                            </Form.Group>
                            <br/>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" name="password"
                                              value={this.state.password} onChange={this.onChange}/>
                            </Form.Group>
                            <br/>
                        </div>
                        <Link to="/register" className="regLink"> No Account? Register here! </Link>

                        <br/>
                        <input type="submit" value="Login"/>
                    </Form>
                </div>
            )
        }
}
export default Login;
