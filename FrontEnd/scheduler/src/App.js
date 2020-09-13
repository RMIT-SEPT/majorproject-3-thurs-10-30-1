import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Dashboard from "./Components/Dashboards/Dashboard";
import Profile from "./Components/Profile/Profile";
import Registration from "./Components/Registration/Registration";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: "NOT_LOGGED_IN",
            user: {}
        }
        this.handleLogin=this.handleLogin.bind(this);
    }

    handleLogin(data)
    {
        this.setState({
            loggedIn: "LOGGED_IN",
            user: data
            }
        )
    }

  render()
  {
    return (
        <Router>
            <Route
                exact path="/"
                render= {props => (
                    <Home{...props} handleLogin={this.handleLogin} loggedIn = {this.state.loggedIn} />
                )}
            />

            <Route
                exact path="/register"
                render={props =>  (
                    <Registration {...props} loggedIn = {this.props.loggedIn} />
                    )}
                />

            <Route
                exact path="/dashboard"
                render={props =>  (
                    <Dashboard {...props} loggedIn = {this.props.loggedIn} />
                )}
            />

            <Route
                exact path="/profile"
                render={props =>  (
                    <Profile {...props} loggedIn = {this.props.loggedIn} />
                )}
            />
        </Router>
    );
  }
}

export default App;