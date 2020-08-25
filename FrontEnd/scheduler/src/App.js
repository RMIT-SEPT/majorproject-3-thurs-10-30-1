import React, { Component } from 'react';
import './App.css';
import Home from "./Components/Home";
import Registration from "./Components/Registration";
import {BrowserRouter as Router} from "react-router-dom";
import Route from "react-router-dom/Route"

class App extends Component {
    state =
        {
            loggedIn:false
        }

  render()
  {

    return (
        <Router>
            <Route exact path ="/" component ={Home}/>
            <Route exact path ="/register" component ={Registration}/>
        </Router>
    );
  }
}

export default App;