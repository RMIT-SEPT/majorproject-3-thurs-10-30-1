import axios from "axios";

export const userLogin = async (details) =>
{
    try
    {
        const res = await axios.post("http://localhost:8080/api/user/login", details);
        console.log(res);
        return res.data;
    }
    catch (err)
    {
        console.log(err);
    }
};