import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import accountType from "./accountType";

export default combineReducers({
    auth,
    accountType,
    message,
});