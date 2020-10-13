import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {workerRegister} from "../../actions/auth";
import {connect} from 'react-redux'
import {getAdmin} from "../../actions/userActions";
import CustomCheckbox from "../Generics/CustomCheckbox";

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
            .then(response => {
                this.setState({
                    services: response.data.business.services,
                    businessID: response.data.business.id
                });
            })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
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

        this.props.dispatch(workerRegister(user,this.state.businessID,this.selectedOptions,this.props.history))
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

    render() {

        const { message } = this.props;
        let realServ;
        const serv = this.state.services;
        if(serv)
        {
            realServ = serv.map((service) => (
                <CustomCheckbox
                    label={service.name}
                    handleCheckboxChange={this.toggleCheckbox}
                    data={service.id}
                    />
            ))
        }

        return (
            <div className="wholeReg">
                <div className="regFormDiv">
                    <h1 className="myHeader"> Create A worker here!</h1>
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

                        {serv
                            ? <div>
                                <h3> SELECT THE WORKERS SERVICES</h3>
                                {realServ}
                                </div>

                            : <p></p>
                        }

                        <input type="submit" value="Register"/>
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
    return {
        user,
        accountType,
        message
    };
}

export default connect(mapStateToProps)(WorkerMaker);