import About from "./aboutUs";
import Login from "./Login";
import React, {Component} from "react";
import AGMEnav from "../Generics/AGMEnav";

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
                <AGMEnav />
                <About/>
                <Login handleAuth={this.handleAuth} />
            </div>)
    }
}

export default Home;