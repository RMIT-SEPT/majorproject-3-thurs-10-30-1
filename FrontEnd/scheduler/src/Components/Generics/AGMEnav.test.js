import React from "react";
import {AGMEnav} from "./AGMEnav";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {NavbarBrand, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";


Enzyme.configure({adapter : new Adapter()});

describe("AGMEnav unit test",() =>
{
    let user={
    name: "max",
    username: "max",
    password: "password",
    contactNumber: 12,
    email: "max@max.com",
    accountType:2
}

    const mockFn = jest.fn();

    let wrapper = shallow(<AGMEnav logout={mockFn} />)
    wrapper.setState({user:user});

    it("should have 2 navlink items while a user it not logged in", () =>
    {
        expect(wrapper.find(Link)).toHaveLength(2);
    });

    it("should have a brand item", () =>
    {
        expect(wrapper.containsMatchingElement(NavbarBrand)).toBe(true);
    });

})