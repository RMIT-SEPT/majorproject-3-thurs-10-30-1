import About from "./aboutUs";
import Login from "./Login";
import React, {Component} from "react";
import {connect} from "react-redux";

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleAuth = this.handleAuth.bind(this);

    }

    handleAuth()
    {
        //check account type, and push to relevant one from here.
        this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div className="homeContainer">
                <About/>
                <Login handleAuth={this.handleAuth} />


            </div>)
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(Home);