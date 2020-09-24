import {SET_ACCOUNT_TYPE} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ACCOUNT_TYPE:
            return { ACCOUNT_TYPE: payload };
        default:
            return state;
    }
}