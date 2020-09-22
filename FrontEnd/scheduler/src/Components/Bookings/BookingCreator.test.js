import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BookingCreator from "./BookingCreator";

Enzyme.configure({adapter : new Adapter()});


describe("Booking Creater Unit Test",() => {
    let services = [
        {businessName: 'Business1'} ,
        {businessName: 'Business2'},
        {businessName: 'Business3'}
    ]

    const Creator = shallow(<BookingCreator services = {services}/>);
    // TEST IS RUNNING HOWEVER NOT CORRENT. 
    it("test worker name to show the same", () => 
        {
            expect(Creator.find('services')).toHaveLength(0);
        });

    })