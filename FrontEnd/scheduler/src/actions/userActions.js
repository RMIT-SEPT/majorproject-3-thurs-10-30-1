import axios from "axios";
const localIpUrl = require('local-ip-url');

export const userLogin = async (details) =>
{
    try
    {
        const res = await axios.post(`http://${localIpUrl()}:8080/api/user/login`, details);
        console.log(res);
        return res.data;
    }
    catch (err)
    {
        console.log(err);
    }
};
