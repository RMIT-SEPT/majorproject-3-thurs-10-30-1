import React from "react";
import {shallow} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BookingCreator} from "./BookingCreator";
import MyCal from "../Generics/myCal";

Enzyme.configure({adapter : new Adapter()});


let wrapper;

beforeEach(() =>
    {
        wrapper = shallow(<BookingCreator />);

    })
describe("Booking Creator Unit Test",() => {

    it("should render with 4 option elements", () =>
        {
            expect(wrapper.find('option')).toHaveLength(3);
        });

    it("should render with 1 myCal element", () =>
    {
        expect(wrapper.find(MyCal)).toHaveLength(1);
    });


    })