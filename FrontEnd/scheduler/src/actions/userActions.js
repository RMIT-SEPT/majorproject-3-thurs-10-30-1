import axios from "axios";

import { SET_CURRENT_USER } from './types';
import { IP } from './networkDetails';


export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export const userLogin =  (details) => {
    //check to see what type of user they are first?
    return axios.post(`http://${IP}:8080/api/user/login`, details)
        .then((response) => {
            if(!response.data)
            {
                console.log("bad resp");
            }
            else
            {
                {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
            }
            return response.data;
        });
};

export const userUpdate = async (details) => {
    const id = details.id;
    return await axios.put("http://localhost:8080/api/user/update/" + id, details)
}

export const getAdmin = async (id) => {
    return await axios.get("http://localhost:8080/api/admin/" + id);
}

export function lilLogout()
{
    localStorage.removeItem("user");
}

export const userCreate = async (user) => {

    return await axios.post(`http://${IP}:8080/api/customer`, user);
}

export const adminCreate = async (user) => {

    return await  axios.post(`http://${IP}:8080/api/admin`, user);
}

export const workerCreate = async (user) => {

    return await axios.post(`http://${IP}:8080/api/worker`, user);
}






