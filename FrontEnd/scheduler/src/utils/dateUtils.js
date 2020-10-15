import {formatDate} from "react-calendar";

export const numToDay = (num) =>
{
    if(num===1)
    {
        return "Mon"
    }
    if(num===2)
    {
        return "Tues"
    }
    if(num===3)
    {
        return "Wed"
    }
    if(num===4)
    {
        return "Thu"
    }
    if(num===5)
    {
        return "Fri"
    }
    if(num===6)
    {
        return "Sat"
    }
    if(num===7)
    {
        return "Sun"
    }
}

export const timeToken = (time,index) =>
{
    const res = time.split(":");
    return res[index];
}

export const createDate = (year,month,day) =>
{
    return (year+"-"+month+"-"+day);
}




