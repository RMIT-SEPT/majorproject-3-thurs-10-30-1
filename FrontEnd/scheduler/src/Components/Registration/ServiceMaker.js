import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {connect} from 'react-redux'
import {addServiceToWorker, getAdmin} from "../../actions/userActions";
import {Redirect} from "react-router-dom";
import {addServiceToBusiness, getWorkerByBusiness} from "../../actions/BusinessActions";
import CustomCheckbox from "../Generics/CustomCheckbox";

//make a service as an admin, and apply workers to it bases on a checkbox selector.
export class ServiceMaker extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
            {
                serviceName: "",
                serviceDesc: "",
                successful: true,
                businessId:undefined,
                message:undefined,
                workers:undefined,
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

    handleOptionChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        });
    }

    componentDidMount()
    {
        this.selectedOptions = new Set();
        const id = this.props.user.userId;
        getAdmin(id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    businessId: response.data.business.id
                });
                getWorkerByBusiness(this.state.businessId)
                    .then(resp =>{
                        this.setState(
                            {
                                workers:resp.data
                            });

                    })
            })
    }


    onChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value});
    }

    //if creation fails, display a helpful error message.
    handleSubmit= async (e) =>
    {
        e.preventDefault();
        const service =
        {
            name: this.state.serviceName,
            description: this.state.serviceDesc,
            workers: this.state.selectedOption,
        }
        addServiceToBusiness(service,this.state.businessId)
        .then(resp=>
        {
            if(resp)
            {
                console.log(resp.data);
                console.log(resp.data.services[resp.data.services.length-1]);
                this.setState({
                    successful: true,
                    message:'Service Created! Make another?',
                });
                addServiceToWorker(this.state.workers[0].id,resp.data.services[resp.data.services.length-1]);
            }
            else
            {
                this.setState(
                    {
                        message:"error!",
                        successful:false,
                    }
                )
            }
        })
    }

    render()
    {
        if(!this.props.isLoggedIn)
        {
            return <Redirect to="/" />;
        }

        let workerOptions;
        const work = this.state.workers;
        if(work)
        {
            workerOptions = work.map((worker) => (
                <CustomCheckbox
                    label={worker.user.name}
                    handleCheckboxChange={this.toggleCheckbox}
                    data={worker.id}
                    key={worker.id}
                />
            ))
        }

        return (
            <div className="createServiceContainer">
                <div className="createServicePage">
                    <h2 className="pageHeader"> Add New Service</h2>
                        <Form onSubmit={this.handleSubmit}>

                                <div className="transparentDiv">

                                    <div className="workersPageText">Service Name</div>
                                        <Form.Group>
                                            <div className="RegistrationTextFieldWidth">
                                                <Form.Control type="text" placeholder="Service name: " value={this.state.serviceName} onChange={this.onChange} name ="serviceName"/>
                                            </div>
                                        </Form.Group>

                                    <div className="workersPageText"> Service Description </div>
                                    <Form.Group>
                                        <div className="RegistrationTextFieldWidth">
                                            <Form.Control type="text" placeholder="Service description...: " value={this.state.serviceDesc} onChange={this.onChange} name="serviceDesc"/>
                                        </div>
                                    </Form.Group>

                                </div>

                        {work
                            ? <div>
                                <center>
                                    <div className="workersPageText"> Link Workers to New Service </div>
                                        <div className="newListGrid">
                                            {workerOptions}
                                        </div>
                                    </center>
                            </div>

                            : <p></p>
                        }


                        {this.state.message && (
                            <div className="form-group">
                                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                        <center>
                            <input type="submit" value="Create"/>
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

export default connect(mapStateToProps)(ServiceMaker);