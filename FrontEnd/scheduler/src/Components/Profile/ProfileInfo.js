import React, {Component} from 'react';
import {connect} from "react-redux";
import DarkButton from "../Generics/DarkButton";


class ProfileInfo extends Component
{
    render() {

        let label = {label: 'Edit Profile Information', link: 'editprofile'}

        return (
            <div className="profilePage">
                <h2 className="pageHeader"> Account Profile </h2>

                {this.props.user ? <h4 className="profileInfo"> Username: <div className="profileText"> {this.props.user.username} </div> </h4> : <p> No user</p>}
                {this.props.user ? <h4 className="profileInfo"> Name: <div className="profileText"> {this.props.user.name} </div> </h4> : <p> No Name</p>}
                {this.props.user ? <h4 className="profileInfo"> Email: <div className="profileText"> {this.props.user.email} </div> </h4> : <p> No Email</p>}
                {this.props.user ? <h4 className="profileInfo"> Contact Number: <div className="profileText"> {this.props.user.contactNumber} </div> </h4> : <p> No Contact Number</p>}
                {this.props.user ? <h4 className="profileInfo"> Account Type: <div className="profileText"> {this.props.user.accountType} </div> </h4> : <p> Account Type = Null</p>}

                <center> <DarkButton label={label} /> </center>

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