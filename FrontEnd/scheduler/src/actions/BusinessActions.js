import axios from "axios";
import { IP } from './networkDetails';

export const getAllBusiness = async () =>
{
    return await axios.get(`http://${IP}:8080/api/business/all`);
}

export const getServiceByBusiness = async (id) =>
{
    return await axios.get(`http://${IP}:8080/api/business/${id}/services`);
}

export const getAvailByService = async (id) =>
{
    return await axios.get(`http://${IP}:8080/api/service/${id}/availabilities`);
}

export const getServiceById = async (id) =>
{
    return await axios.get(`http://${IP}:8080/api/service/${id}`);
}

export const getWorkerByService = async (id) =>
{
    return await axios.get(`http://${IP}:8080/api/service/${id}/workers`);
}

export const getWorkerByBusiness = async (id) =>
{
    return await axios.get(`http://${IP}:8080/api/business/${id}/workers`);
}


export const tryCreateBooking = async (bookingRequest,serviceId) =>
{
    try
    {

        return await axios.post(`http://${IP}:8080/api/service/${serviceId}/book`,bookingRequest);
    }
    catch (err)
    {
        console.log(err.message);
    }
}

export const createNewAvail = async (avail,serviceId) =>
{
    return await axios.post(`http://${IP}:8080/api/service/${serviceId}/addAvailability`,avail)
}

export const getServiceByWorker = async (id) =>
{
    return await axios.get(`http://${IP}:8080/api/worker/${id}/services`);
}






