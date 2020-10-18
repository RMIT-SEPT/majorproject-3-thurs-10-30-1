import React, {Component} from 'react';
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import {userUpdate} from "../../actions/userActions";


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
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    onChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit= async (e) => {
        e.preventDefault();
        const user =
        {
            name: this.state.name,
            username: this.state.username,
            password: this.props.user.password,
            contactNumber: this.state.contactNumber,
            email: this.state.email,
        }
        console.log(user);

        const res = userUpdate(user);
        console.log(res.data);
    }



    render() {
        return (
            <div className="editProfileContainer">

                <div className="editProfilePage">
                    <h2 className="pageHeader"> Edit Profile Information </h2>
                    <Form onSubmit={this.handleSubmit}>

                        <center>
                        <div className="profileInfo"> Username: </div>
                            <Form.Group>
                                <div className="EditProfileTextFieldWidth">
                                    <Form.Control type="text" placeholder= {this.props.user.username} value={this.state.username} onChange={this.onChange} name ="username"/>
                                </div>
                             </Form.Group>

                        <div className="profileInfo"> Name: </div>
                            <Form.Group>
                                <div className="EditProfileTextFieldWidth">
                                    <Form.Control type="text" placeholder= {this.props.user.name} value={this.state.name} onChange={this.onChange} name ="name"/>
                                </div>
                            </Form.Group>

                        <div className="profileInfo"> Email: </div>
                            <Form.Group>
                                <div className="EditProfileTextFieldWidth">
                                    <Form.Control type="text" placeholder= {this.props.user.email} value={this.state.email} onChange={this.onChange} name ="email"/>
                                </div>
                            </Form.Group>

                        <div className="profileInfo"> Contact Number: </div>
                            <Form.Group>
                                <div className="EditProfileTextFieldWidth">
                                    <Form.Control type="number" placeholder= {this.props.user.contactNumber} value={this.state.contactNumber} onChange={this.onChange} name ="contactNumber"/>
                                </div>
                            </Form.Group>
                        </center>

                        <br/>

                        {this.props.user ? <h4 className="profileInfo"> Account Type: <div className="profileText"> {this.props.user.accountType} </div> </h4> : <p> Account Type = Null</p>}
`

                {/*<input type="submit" title="Submit(non-functional)" disabled/>*/}

                </Form>
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