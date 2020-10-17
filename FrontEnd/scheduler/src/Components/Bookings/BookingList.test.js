import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BookingList} from "./BookingList";

Enzyme.configure({adapter : new Adapter()});


describe("Booking List Unit Test",() => {

    let bookings = [
        {availability:1,
        customer:4,
        date:"2020-10-12",
        id:1,
        service:1,
        start_time:"2020-10-12",
        status:"booked"
        }
    ]
    const wrapper = shallow(<BookingList bookings = {bookings}/>);

    it("Should have 1 h2", () =>
    {
        expect(wrapper.find('h2')).toHaveLength(1);
    });

    it("Should have 1 h2 with a certain message", () =>
    {
        expect(wrapper.find('h2').at(0).text()).toEqual("Upcoming Bookings");
    });


    it("Should have 2 divs when given one booking", () =>
    {
        expect(wrapper.find('div')).toHaveLength(2);
    });


})