import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import {userLogin} from "../../actions/userActions";


class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
            {
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
            //send the username and password to the backend to be verified
            e.preventDefault();
            const details =
            {
                identifier: this.state.email,
                password: this.state.password
            }
            //error checking before
            userLogin(details).then(res =>
            {
                console.log(res.data);
                if(res.data===true)
                {
                    console.log("its good");
                    this.props.handleAuth(res.data);
                }
                else
                {
                    console.log("run some errors")
                }
            });
        }

        render() {
            return (
                <div className="loginContainer">
                    <h1 className="myHeader"> SIGN IN</h1>

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
