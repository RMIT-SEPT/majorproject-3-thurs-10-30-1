import axios from "axios";

export const getAllBusiness = async () =>
{
    return await axios.get("http://localhost:8080/api/business/all");
}
