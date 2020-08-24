import React, { Component } from 'react';
import './App.css';
import AGMEnav from "./Components/AGMEnav";
import Login from "./Components/Login";
import About from "./Components/aboutUs";
import {BrowserRouter as Router} from "react-router-dom";
import Route from "react-router-dom/Route"

class App extends Component {
    state =
        {
            loggedIn:false
        }

  render()
  {
      let links = [
          {label: 'Home', link: '/'},
          {label: 'Testing a Link', link: '/'},
          {label: 'Register', link: '/register'}
      ]

    return (
        <Router>
            <Route path ="/" exact render={
                () => {
                    return(
                        <div className="homeContainer">
                        <AGMEnav links={links} />
                        <About />
                        <Login />
                    </div>)
                }
            }
/>
            <Route path ="/register" exact render={
                () => {
                    return(
                        <div> The register form will go here</div>
                    )
                }
            }
            />
        </Router>
    );
  }
}

export default App;