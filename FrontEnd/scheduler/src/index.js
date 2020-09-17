import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {createStore} from "redux";
import setAuthorizationToken from "./utils/utils";







ReactDOM.render(
  <App />,
  document.getElementById('root'));

