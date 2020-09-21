import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Registration} from "./Registration";
import {FormControl} from "react-bootstrap";
import {userCreate} from "../../actions/userActions";
import {Provider} from "react-redux";
import store from "../../store";
import configureStore from "redux-mock-store";

Enzyme.configure({adapter : new Adapter()});

describe("Register unit test",() => {

    const wrapper = shallow( <Registration  />);

    beforeEach(() =>
    {
        wrapper.resetState;
    })

    beforeAll(() =>
    {
        let user={
            name: "max",
            username: "max",
            password: "password",
            contactNumber: 12,
            email: "max@max.com",
            accountType:2
        }
        userCreate(user);
    })

    it("should have 5 formControl elements", () =>
    {
        expect(wrapper.find(FormControl)).toHaveLength(5);
    });

    it("Username should update value with text change", () => {
        wrapper.find(FormControl).at(0).dive().simulate('change', { target: { name: "username", value: "max" } });
        expect(wrapper.find(FormControl).at(0).prop('value')).toEqual("max");
    });

})
