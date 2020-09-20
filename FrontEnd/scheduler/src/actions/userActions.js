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
        .then((response) =>
        {
            if (response)
            {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("Type",response.data.accountType);
            }
            return response.data;
        });
};



export function logout()
{
        localStorage.removeItem("user");
        localStorage.removeItem("Type");
}

export async function userCreate(user,history)
{
    try
    {
        const res =  await axios.post("http://localhost:8080/api/customer", user);
        console.log(res.data.name);
        history.push("/");
        return res;
    }
    catch (err)
    {
        console.log('ERROR');
        console.log(err);
        return false;
    }
}

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
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


