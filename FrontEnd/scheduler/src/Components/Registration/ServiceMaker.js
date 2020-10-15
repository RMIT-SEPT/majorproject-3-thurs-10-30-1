import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {connect} from 'react-redux'
import {addServiceToWorker, getAdmin} from "../../actions/userActions";
import {Redirect} from "react-router-dom";
import {addServiceToBusiness} from "../../actions/BusinessActions";

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
            };
        this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        const id = this.props.user.userId;
        getAdmin(id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    businessId: response.data.business.id
                });
            })
    }


    onChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit= async (e) =>
    {
        e.preventDefault();
        const service =
        {
            serviceName: this.state.serviceName,
            serviceDesc: this.state.serviceDesc,
            availability: null
        }
        console.log(service);
        console.log("business ID:")
        console.log(this.state.businessId);

        addServiceToBusiness(service,this.state.businessId)
        .then(resp=>
        {
            if(resp)
            {
                this.setState({
                    successful: true
                });
                console.log(resp.data);
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

        return (
                <div className="regFormDiv">
                    <h1 className="myHeader"> Create A Service here!</h1>
                    <Form className="mr-auto" onSubmit={this.handleSubmit}>
                        <div className="transparentDiv">
                            <Form.Group>
                                <Form.Control type="text" placeholder="Service name: " value={this.state.serviceName} onChange={this.onChange} name ="serviceName"/>
                            </Form.Group>


                            <Form.Group>
                                <Form.Control type="text" placeholder="Service description...: " value={this.state.serviceDesc} onChange={this.onChange} name="serviceDesc"/>
                            </Form.Group>

                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                        <input type="submit" value="Create"/>
                    </Form>
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