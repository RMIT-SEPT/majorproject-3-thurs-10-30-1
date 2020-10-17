import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BookingCreator} from "./BookingCreator";

Enzyme.configure({adapter : new Adapter()});


describe("Booking Creator Unit Test",() => {

    const Creator = shallow(<BookingCreator />);

    it("should render with 4 option elements", () =>
        {
            expect(Creator.find('option')).toHaveLength(3);
        });

    })