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


//might have to change to make it set the token so we know the account type
export async function userLogin(details) {
    try
    {
        const res = await axios.post("http://localhost:8080/api/user/login", details);
        console.log(res.data);
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('LoggedIn',"yes");
        return res;
    }
    catch (err)
    {
        console.log(err);

    }
}

export function userCreate(user)
{
    try
    {
        return axios.post("http://localhost:8080/api/user", user);
    }
    catch (err)
    {
        console.log(err);
    }
}

