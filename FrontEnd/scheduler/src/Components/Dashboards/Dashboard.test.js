import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Form, FormControl} from "react-bootstrap";
import {Dashboard} from "./Dashboard";


Enzyme.configure({adapter : new Adapter()});

describe("Dashboard Unit Test",() => {

    const dashboard = shallow(<Dashboard />);
    
        it("should have a booking list", () =>
            {
                expect(dashboard.find('BookingList')).toHaveLength(1);
            });

        it("should have a booking creater", () =>
            {
                expect(dashboard.find('BookingCreator')).toHaveLength(1);
            });
            
    })    