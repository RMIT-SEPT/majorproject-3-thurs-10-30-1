import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import { login } from "../../actions/auth"

export class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
            {
                email:"",
                password:"",
                loading: false,
            };
            this.onChange=this.onChange.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
            this.resetState=this.resetState.bind(this);
    }

    onChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value});
    }

     resetState()
    {
        this.setState(
            {
                email:"",
                password:"",
                loading: false
            }
        )
    }

    handleSubmit= async (e) => {
        //send the username and password to the backend to be verified
        e.preventDefault();
        this.setState({
            loading: true
        });
        const details =
        {
            identifier: this.state.email,
            password: this.state.password
        }

        const {dispatch, history} = this.props;
         dispatch(login(details))
            .then(() => {
                // window.location.reload();
                // history.push("/dashboard");
            }).catch(() => {
            this.setState({
                loading: false
            });
        });
    }
        render() {
            const { isLoggedIn, message } = this.props;
            if (isLoggedIn) {
                return <Redirect to="/dashboard" />;
            }
            return (
                <div className="loginContainer">
                    <h1 className="myHeader"> SIGN IN</h1>

                    <Form onSubmit={this.handleSubmit}>

                        <div className="transparentDiv">

                            <Form.Group>
                                <Form.Control type="email" required placeholder="Enter email" value={this.state.email}
                                              onChange={this.onChange} name="email"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="password" required placeholder="Password" name="password"
                                              value={this.state.password} onChange={this.onChange}/>
                            </Form.Group>
                        </div>

                        <br/>

                        <Link to="/register" className="regLink"> No Account? Register here! </Link>

                        <br/>
                        <br/>

                        <input type="submit" value="Login"/>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                    </Form>
                </div>
            )
        }
}

function mapStateToProps(state) {
    const {isLoggedIn} = state.auth;
    const {message} = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);
