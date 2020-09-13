import axios from "axios";
import {SET_CURRENT_USER} from "../utils/types";

// export const userLogin = async (details) =>
// {
//     try
//     {
//         const res = await axios.post("http://localhost:8080/api/user/login", details)
//         console.log(res);
//         const token = res.data.token;
//         sessionStorage.setItem('jwtToken',token);
//         return res.data;
//     }
//     catch (err)
//     {
//         console.log(err);
//     }
// };

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function userLogin(details)
{
    try {
         return axios.post("http://localhost:8080/api/user/login", details);
    //     .then(
    //         res => {
    //             console.log(res.data);
    //             console.log(res);
    //             //this returns true?
    //             const token = res.data.token;
    //             sessionStorage.setItem('jwtToken', token);
    //             sessionStorage.setItem('Username', res.data.name);
    //         }
    //     )
     }
    catch (err)
    {
        console.log(err);
    }

}

export function userCreate(user)
{
    try{
        return axios.post("http://localhost:8080/api/user", user);
    }
    catch (err)
    {
        console.log(err);
    }
}

