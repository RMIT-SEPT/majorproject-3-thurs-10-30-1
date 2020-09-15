import React from "react";
import Login from "./Login";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Form, FormControl} from "react-bootstrap";
import MyError from "../Generics/MyError";

Enzyme.configure({adapter : new Adapter()});


describe("Login unit test",() => {

    const wrapper = shallow(<Login />);
    beforeEach(() =>
    {

    })

    it("should have 2 formControl elements", () =>
    {
        expect(wrapper.find(FormControl)).toHaveLength(2);
    });

    it("Should render with both fields blank", () => {
        expect(wrapper.find(FormControl).at(0).prop('value')).toEqual("");
        expect(wrapper.find(FormControl).at(1).prop('value')).toEqual("");
    });

    it("Should update value with text change", () => {
        wrapper.find(FormControl).at(0).dive().simulate('change', { target: { name: "email", value: "a" } });
        expect(wrapper.find(FormControl).at(0).prop('value')).toEqual("a");
    });

    //test that backend works?
    //need to wait properly ?
    it("should fail when it tries to login with no account", async () => {
        const fakeEvent = {preventDefault: () => console.log('preventDefault')};
        await wrapper.find(Form).simulate('submit',fakeEvent);
        expect(wrapper.find(MyError)).toHaveLength(1);
    });

})
