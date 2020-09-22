import React, {Component} from 'react';
import {connect} from "react-redux";
import DarkButton from "../Generics/DarkButton";
import Form from "react-bootstrap/Form";


class ProfileInfo extends Component
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
            };
        this.onChange=this.onChange.bind(this);
    }

    onChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        let label = {label: 'Save', link: '/profile'}

        return (
            <div className="editProfileContainer">

                <div className="profilePage">
                <h2 className="pageHeader"> Edit Profile Information </h2>

                <div className="profileText"> UserName </div>
                <Form.Group>
                    <Form.Control type="text" placeholder= {this.props.user.username} value={this.state.username} onChange={this.onChange} name ="username"/>
                </Form.Group>

                <div className="profileText"> Name </div>
                <Form.Group>
                    <Form.Control type="text" placeholder= {this.props.user.name} value={this.state.name} onChange={this.onChange} name ="name"/>
                </Form.Group>

                <div className="profileText"> Email </div>
                <Form.Group>
                    <Form.Control type="text" placeholder= {this.props.user.email} value={this.state.email} onChange={this.onChange} name ="email"/>
                </Form.Group>

                <div className="profileText"> Contact Number </div>
                <Form.Group>
                    <Form.Control type="text" placeholder= {this.props.user.contactNumber} value={this.state.contactNumber} onChange={this.onChange} name ="contactNumber"/>
                </Form.Group>

                {this.props.user ? <h4 className="profileInfo"> Account Type: <div className="profileText"> {this.props.user.accountType} </div> </h4> : <p> Account Type = Null</p>}

                <center> <DarkButton label={label} /> </center>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps) (ProfileInfo);