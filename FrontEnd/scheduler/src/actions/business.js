import axios from "axios";
import { IP } from './networkDetails';

export const getAllBusiness = async () =>
{
    return await axios.get(`http://${IP}:8080/api/business/all`);
}
