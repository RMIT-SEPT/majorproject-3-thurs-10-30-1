import axios from "axios";
const publicIp = require('public-ip');

export const userLogin = async (details) =>
{
    try
    {
        const res = await axios.post(`http://${await publicIp.v4()}:8080/api/user/login`, details);
        console.log(res);
        return res.data;
    }
    catch (err)
    {
        console.log(err);
    }
};
