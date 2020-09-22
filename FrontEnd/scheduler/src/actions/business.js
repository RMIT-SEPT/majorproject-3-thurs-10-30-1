import axios from "axios";

export const getAllBusiness = () =>
{
    return axios.get("http://localhost:8080/api/business/all");
}
