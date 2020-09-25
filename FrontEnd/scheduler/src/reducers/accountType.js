import {SET_ACCOUNT_TYPE} from "../actions/types";


const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ACCOUNT_TYPE:
            console.log("IN THE ACC REDUCER")
            console.log(payload);
            return {
                ...state,
                accountType: payload
            };
        default:
            return state;
    }
}