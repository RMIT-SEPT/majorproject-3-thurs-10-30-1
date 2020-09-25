import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {adminRegister, register} from "../../actions/auth";
import {connect} from 'react-redux'

export class Registration extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
            {
                name:"",
                username:"",
                contactNumber:"0",
                email:"",
                password:"",
                admin:false,
                successful:true,
            };
        this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.enableAdmin=this.enableAdmin.bind(this);
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
        }
        console.log(user);
        this.setState({
            successful: false,
        });

        if(!this.state.admin)
        {
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
        else {
            this.props.dispatch(adminRegister(user, this.props.history))
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

    enableAdmin()
    {
        this.setState(
            {
                admin:true
            }
            )
    }

    render() {
        const { message } = this.props;
        return (
                <div className="RegistrationBackground">
                    <div className= "Registration">
                        <h1 className="myHeader"> Register Here!</h1>
                            <Form className="mr-auto" onSubmit={this.handleSubmit}>
                                <div className="transparentDiv">
                                    <div className="RegistrationPageText"> Enter Username</div>
                                        <Form.Group>
                                            <div className="RegistrationTextFieldWidth">
                                                <Form.Control type="text" placeholder="Username" value={this.state.username} onChange={this.onChange} name ="username" size= "50"/>
                                            </div>
                                        </Form.Group>
                                    <div className="RegistrationPageText"> Enter Email</div>
                                        <Form.Group controlId="formBasicEmail">
                                            <div className="RegistrationTextFieldWidth">
                                                <Form.Control type="email" placeholder="Email" value={this.state.email} onChange={this.onChange} name="email"/>
                                            </div>
                                        </Form.Group>
                                    <div className="RegistrationPageText"> Enter Full Name </div>
                                        <Form.Group>
                                            <div className="RegistrationTextFieldWidth">
                                                <Form.Control type="text" placeholder="Person Name" value={this.state.name} onChange={this.onChange} name="name"/>
                                            </div>
                                        </Form.Group>
                                    <div className="RegistrationPageText"> Enter Contact Number</div>
                                        <Form.Group >
                                            <div className="RegistrationTextFieldWidth">
                                                <Form.Control type="number" placeholder="Contact Number" value={this.state.contactNumber} onChange={this.onChange} name="contactNumber"/>
                                            </div>
                                        </Form.Group>
                                    <div className="RegistrationPageText"> Enter Password </div>
                                        <Form.Group controlId="formBasicPassword">
                                            <div className="RegistrationTextFieldWidth">
                                                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                                            </div>
                                        </Form.Group>
                                </div>

                            <input type="radio" onClick={this.enableAdmin}/>
                                {message && (
                                    <div className="form-group">
                                        <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                            {message}
                                        </div>
                                    </div>
                                )}
                           <center> <input type="submit" value="Register"/> </center>
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