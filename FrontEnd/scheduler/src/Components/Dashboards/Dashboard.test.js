import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Form, FormControl} from "react-bootstrap";

Enzyme.configure({adapter : new Adapter()});
// NEED TO FIX THESE TEST
describe("Dashboard Unit Test",() => {

    const dashboard = shallow(<BookingList bookings = {bookings}/>);
    const dashboard1 = shallow(<BookingCreator services = {services}/>);
    
        it("test", () =>
            {
                expect(dashboard.find('div')).toHaveLength(1);
                expect(dashboard1.find('div')).toHaveLength(1);
            });
        })    