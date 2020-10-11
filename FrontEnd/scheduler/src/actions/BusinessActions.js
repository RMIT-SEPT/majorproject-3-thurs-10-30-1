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

export const getBusinessByAdmin= async (id) =>
{

}

export const getAvailByService = async (id) =>
{
    return await axios.post(`http://${IP}:8080/api/service/${id}/availabilities`);
}

export const newBooking = async (booking) =>
{
    return await axios.post(`http://${IP}:8080/api/booking`,booking);
}

export const tryCreateBooking = async (bookingRequest,serviceId) =>
{
    return await axios.post(`http://${IP}:8080/api/service/${serviceId}/book`,bookingRequest);
}




