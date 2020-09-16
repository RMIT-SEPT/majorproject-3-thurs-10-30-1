import React from "react";
import Login from "./Login";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Form, FormControl} from "react-bootstrap";

Enzyme.configure({adapter : new Adapter()});


describe("Booking Creator Unit Test",() => {

    const wrapper = shallow(<BookingCreator />);

    it("should have 2 formControl elements", () =>
    {
      //  expect(wrapper.find()).toHaveLength(2);
    });

});