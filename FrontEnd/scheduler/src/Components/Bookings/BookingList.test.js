import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Form, FormControl} from "react-bootstrap";
import BookingList from "./BookingList";

Enzyme.configure({adapter : new Adapter()});


describe("Booking List Unit Test",() => {
    let bookings = [
        {customer: 'Test ',worker: 'Ali ', service: "Ali's Hairdresser ", start_time: "13:30 ", end_time: "13:30"},
        {customer: 'Test ',worker: 'Max ', service: "Clearing Max ", start_time: "8:00 ", end_time: "8:00"},
        {customer: 'Test ',worker: 'Fady ', service: "Fady Car-Mechanic ", start_time: "15:30 ", end_time: "15:30"},
        {customer: 'Test ',worker: 'Zac ', service: "IT Services ", start_time: "11:15 ", end_time: "11:15"}, 
        {customer: 'Test ',worker: 'Ali ', service: "Ali's Hairdresses ", start_time: "18:45 ", end_time: "18:45"},
    ]
    const booking = shallow(<BookingList bookings = {bookings}/>);

        it("test worker name to show the same", () => 
        {
            expect(booking.find('h4')).toHaveLength(5);
        });

        it("test worker name to show the same", () => 
        {
            expect(booking.find('h4').at(0).text()).toEqual("Customer Name: Test Staff Member: Ali Service: Ali's Hairdresser Start Time: 13:30 End Time: 13:30");
        });
})