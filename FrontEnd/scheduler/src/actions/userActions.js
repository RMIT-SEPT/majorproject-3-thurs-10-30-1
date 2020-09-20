import axios from "axios";
import { SET_CURRENT_USER } from './types';



export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export const userLogin = (details) => {
    try{
        return axios.post("http://localhost:8080/api/user/login", details)
            .then((response) => {

                if(!response.data)
                {
                    console.log("bad resp");
                }

                else {
                    console.log("in if");
                    console.log(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    localStorage.setItem("Type", response.data.accountType);
                    return true;
                }
            });
        }
        catch (err)
        {
            console.log('LOGIN ERROR');
            console.log(err);
        }
};



export function logout()
{
        localStorage.removeItem("user");
        localStorage.removeItem("Type");
}

export const userCreate = async (user, history) => {
    try {
        const res = await axios.post("http://localhost:8080/api/customer", user);
        history.push("/");
        return true;
    }
    catch (err)
    {
        console.log("ERRORS");
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


