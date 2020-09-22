import axios from "axios";
import { IP } from './networkDetails';

export const getAllBusiness = () =>
{
    return axios.get(`http://${IP}:8080/api/business/all`);
}
