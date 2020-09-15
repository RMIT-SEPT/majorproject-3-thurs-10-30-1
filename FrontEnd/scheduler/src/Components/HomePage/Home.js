import About from "./aboutUs";
import Login from "./Login";
import React, {Component} from "react";
import AGMEnav from "../Generics/AGMEnav";

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleAuth = this.handleAuth.bind(this);

    }

    handleAuth(data)
    {
        this.props.history.push("/dashboard");
        this.props.handleLogin(data);
    }

    render() {
        return (
            <div className="homeContainer">
                <h1>Status: {this.props.loggedIn} </h1>
                <h1>User: {this.props.user} </h1>
                <AGMEnav loggedIn={this.props.loggedIn}/>
                <About/>
                <Login handleAuth={this.handleAuth} />
            </div>)
    }
}

export default Home;