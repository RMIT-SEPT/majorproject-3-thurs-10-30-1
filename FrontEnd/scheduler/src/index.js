import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {createStore} from "redux";
import setAuthorizationToken from "./utils/utils";

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}

const store = createStore(todos,['Empty Store'])

setAuthorizationToken(localStorage.jwtToken);

ReactDOM.render(
    <Provider store={store}>
  <App />
    </Provider>,
  document.getElementById('root'));

