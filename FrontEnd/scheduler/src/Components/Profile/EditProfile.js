import React, {Component} from 'react';
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import {userUpdate} from "../../actions/userActions";
import {updateUserStore} from "../../actions/auth";


class EditProfile extends Component
{


    constructor(props)
    {
        super(props);
        this.state=
        {
            name:this.props.user.name,
            username:this.props.user.name,
            contactNumber:this.props.user.contactNumber,
            email:this.props.user.email,
            successful:true,
            message:""

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
        const myId = this.props.user.userId;
        const userUpdateRequest =
        {
            userId:myId,
            name: this.state.name,
            username: this.state.username,
            contactNumber: this.state.contactNumber,
            email: this.state.email,
        }
        console.log("MY UPDATE REq");
        console.log(userUpdateRequest);
       userUpdate(myId,userUpdateRequest).then(r=>
       {
           console.log(r.data);
           if(r)
           {
               const {dispatch, history} = this.props;
               dispatch(updateUserStore(r.data))
               this.setState(
                   {
                       successful:true,
                       message:"Profile Updated!!",
                   });
           }
           else
           {
               this.setState(
                   {
                       successful:false,
                       message:"There was an error. Please retry"
                   })
           }
       })
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

                <input type="submit" title="Update" />
                </Form>
                    {this.state.message && (
                        <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                            {this.state.message}
                        </div>
                    )}
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

export default connect(mapStateToProps) (EditProfile);