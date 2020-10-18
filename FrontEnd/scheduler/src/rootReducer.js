import { combineReducers } from 'redux';

import auth from "./reducers/auth";
import accountType from "./reducers/accountType";

export default combineReducers({
    auth,accountType
});