import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Form, FormControl} from "react-bootstrap";
import BookingList from "./BookingList";

Enzyme.configure({adapter : new Adapter()});


describe("Booking List Unit Test",() => {
    let bookings = [
        {workerName: 'Ali ', service: "Ali's Hairdresser ", time: "13:30 ", date: "04/10"},
        {workerName: 'Max ', service: "Clearing Max ", time: "8:00 ", date: "10/10"},
        {workerName: 'Fady ', service: "Fady Car-Mechanic ", time: "15:30 ", date: "12/10"},
        {workerName: 'Zac ', service: "IT Services ", time: "11:15 ", date: "16/10"}, 
        {workerName: 'Ali ', service: "Ali's Hairdresses ", time: "18:45 ", date: "20/10"},
    ]
    const wrapper = shallow(<BookingList bookings = {bookings}/>);

        it("test worker name to show the same", () => 
        {
            expect(wrapper.find('h4')).toHaveLength(5);
        });

        it("test worker name to show the same", () => 
        {
            expect(wrapper.find('h4').at(0).text()).toEqual("Staff Member: Ali Service: Ali's Hairdresser Time: 13:30 Date: 04/10");
        });
})