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
        this.onChangeNumber=this.onChangeNumber.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.enableAdmin=this.enableAdmin.bind(this);
    }

    onChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value});
    }

    onChangeNumber = (e) =>
    {
        this.setState({[e.target.name]: parseInt(e.target.value)});
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
            <div className="wholeReg">
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
                                <Form.Control type="number" placeholder="Contact Number: " value={this.state.contactNumber} onChange={this.onChangeNumber} name="contactNumber"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
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