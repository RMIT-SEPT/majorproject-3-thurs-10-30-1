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

export const register = (user,history) => (dispatch) => {
    return userCreate(user).then(
        (response) => {
            console.log(response);
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
export const workerRegister = (user,businessID, serviceSet,history) => (dispatch) => {
        return workerCreate(user).then(
            response => {
            addBusinessToWorker(response.data.id, businessID).then(
                r => {
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
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            //history.push("/dashboard");
            return Promise.resolve();
        },
        (error) => {
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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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