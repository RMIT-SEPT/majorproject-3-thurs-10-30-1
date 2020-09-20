import axios from "axios";
import { SET_CURRENT_USER } from './types';



export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export const userLogin = (details) => {
    return axios.post("http://localhost:8080/api/user/login", details)
        .then((response) => {
            if(!response.data)
            {
                console.log("bad resp");
            }
            else {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("Type", response.data.accountType);
            }
            return response.data;
        });
};

export function lilLogout()
{
        localStorage.removeItem("user");
        localStorage.removeItem("Type");
}

export const userCreate = async (user) => {

    return axios.post("http://localhost:8080/api/customer", user);
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const isLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user)
    {
        return true;
    }
    return false;
};


