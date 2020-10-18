import React, {Component} from "react";

import ProfileInfo from "../Profile/ProfileInfo";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Profile extends Component
{
    render()
    {
        if(!this.props.isLoggedIn)
        {
            return <Redirect to="/" />;
        }

        return (
            <div className="profileContainer">
                <ProfileInfo />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    const {isLoggedIn} = state.auth;
    return {
        user,
        isLoggedIn,
    };
}
export default connect(mapStateToProps) (Profile);
