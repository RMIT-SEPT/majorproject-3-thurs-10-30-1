import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    SET_ACCOUNT_TYPE,
} from "./types";
import {addBusinessToWorker, addServiceToWorker, lilLogout, userCreate, userLogin, workerCreate} from "./userActions";

//call usercreate api call
//set the 'message' to refelect this
//if fail, display responsive message
export const register = (user,history) => (dispatch) => {
    return userCreate(user).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            history.push("/");
            return Promise.resolve();
        },
        (error) => {
            console.log(error);
            console.log(error.data);
            console.log(error.response.data);
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

//create a worker as an admin
//take in worker to create user as normal, and add to special worker table
//take in a list of service, add each service to worker individually.
export const workerRegister = (user,businessID, serviceSet,history) => (dispatch) => {
        workerCreate(user).then(
            response => {
                console.log(response);
            addBusinessToWorker(response.data.id, businessID)
                .then(r => {
                    console.log("business added: ")
                    console.log(r);
                   for (const ID of serviceSet)
                   {
                       console.log(ID);
                       addServiceToWorker(response.data.id, ID).then(
                       r2 =>
                       {
                            console.log("service added: ");
                            console.log(r2.data);
                       });
                   }
                    });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            history.push("/adminHome");
            return Promise.resolve();
        },
        (error) => {
            console.log(error);
            console.log(error.data);
            console.log(error.response.data);
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

//call login API
//if correct, set logged in state in redux to truw
//set current user in redux as returned user (all info, not just email as is sent)
//if fail display informative error message, set as redux message state.
export const login = (details) => (dispatch) => {
    return userLogin(details).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });

            dispatch({
                type: SET_ACCOUNT_TYPE,
                payload: data.accountType
            });
            return Promise.resolve();
        },
        (error) => {
            console.log(error.response.data);
            const message =error.response.data
            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    lilLogout();
    dispatch({
        type: LOGOUT,
    });
};