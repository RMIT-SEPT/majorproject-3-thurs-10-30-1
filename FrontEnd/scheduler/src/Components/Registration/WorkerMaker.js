import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {workerRegister} from "../../actions/auth";
import {connect} from 'react-redux'
import {getAdmin} from "../../actions/userActions";
import CustomCheckbox from "../Generics/CustomCheckbox";

import {getServiceByBusiness} from "../../actions/BusinessActions";
import {Redirect} from "react-router-dom";



export class WorkerMaker extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            name: "",
            username: "",
            contactNumber: 0,
            email: "",
            password: "",

            successful: true,
            message:"",
            services: undefined,
            businessID:0,
        };
        this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleOptionChange=this.handleOptionChange.bind(this);
        this.toggleCheckbox=this.toggleCheckbox.bind(this);
    }

    toggleCheckbox = key =>
    {
        if (this.selectedOptions.has(key))
        {
            this.selectedOptions.delete(key);
        }
        else
            {
            this.selectedOptions.add(key);
        }
    }

    componentDidMount()
    {
        this.selectedOptions = new Set();
        const id = this.props.user.userId;
        getAdmin(id)
            .then(response =>
            {
                this.setState({
                    businessID: response.data.business.id
                });

                getServiceByBusiness(this.state.businessID)
                    .then(r =>
                    {
                        this.setState(
                            {
                                services:r.data
                            }
                        )
                    })
            })
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
        };
    }

    handleOptionChange = (e) => {
    this.setState({
        selectedOption: e.target.value
    });
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
        //get the currentServices
        this.setState({
            successful: false,
        });

        const {dispatch, history} = this.props;
        dispatch(workerRegister(user,this.state.businessID,this.selectedOptions,this.props.history))
        this.setState({
            successful: false,
            message:"Error! that user already exists"
        });
        }

    render()
    {
        if(!this.props.isLoggedIn)
        {
            return <Redirect to="/" />;
        }

        const { message } = this.state.message;
        let realServ;
        const serv = this.state.services;
        if(serv)
        {
            realServ = serv.map((service) => (
                <CustomCheckbox
                    key={service.id}
                    label={service.name}
                    handleCheckboxChange={this.toggleCheckbox}
                    data={service.id}
                    />
            ))
        }

        return (
            <div className="createWorkerContainer">
                <div className="createWorkerPage">
                    <h2 className="pageHeader"> Create a Worker</h2>

                        <Form onSubmit={this.handleSubmit}>

                            <div className="transparentDiv">

                                <div className="workersPageText"> Enter Username</div>
                                    <Form.Group>
                                        <div className="RegistrationTextFieldWidth">
                                            <Form.Control type="text" placeholder="Username: " value={this.state.username} onChange={this.onChange} name ="username"/>
                                        </div>
                                    </Form.Group>

                                <div className="workersPageText"> Enter Email</div>
                                    <Form.Group controlId="formBasicEmail">
                                        <div className="RegistrationTextFieldWidth">
                                            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChange} name="email"/>
                                        </div>
                                    </Form.Group>

                                <div className="workersPageText"> Enter Name</div>
                                    <Form.Group>
                                        <div className="RegistrationTextFieldWidth">
                                            <Form.Control type="text" placeholder="Workers Name: " value={this.state.name} onChange={this.onChange} name="name"/>
                                        </div>
                                    </Form.Group>

                                <div className="workersPageText"> Enter Contact Number</div>
                                    <Form.Group >
                                        <div className="RegistrationTextFieldWidth">
                                            <Form.Control type="number" placeholder="Contact Number: " value={this.state.contactNumber} onChange={this.onChange} name="contactNumber"/>
                                        </div>
                                    </Form.Group>

                                <div className="workersPageText"> Enter Password</div>
                                    <Form.Group controlId="formBasicPassword">
                                        <div className="RegistrationTextFieldWidth">
                                            <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                                        </div>
                                    </Form.Group>
                            </div>

                            {this.state.message && (
                                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {this.state.message}
                                </div>
                            )}

                        {serv
                            ? <div>
                                <center>
                                    <h3 className="workersPageText"> Select the Workers Service </h3>
                                        <div className="newListGrid">
                                            {realServ}
                                        </div>
                                </center>
                            </div>

                            : <p></p>
                        }


                        <center>
                            <input type="submit" value="Register"/>
                        </center>

                    </Form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {message} = state.message;
    const {user} = state.auth;
    const {accountType}= state.accountType;
    const {isLoggedIn} = state.auth;
    return {
        user,
        accountType,
        message,
        isLoggedIn
    };
}

export default connect(mapStateToProps)(WorkerMaker);