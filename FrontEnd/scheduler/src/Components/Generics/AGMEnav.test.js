import React from "react";
import AGMEnav from "./AGMEnav";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {NavbarBrand, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";

Enzyme.configure({adapter : new Adapter()});

describe("AGMEnav unit test",() =>
{
    const mockFn = jest.fn();
    let links = [
        {label: 'Home', link: '/'},
        {label: 'Testing a Link', link: '/'},
        {label: 'Register', link: '/register'}
    ]

        const wrapper = shallow(<AGMEnav links={links}/>);


    it("should have navlink items", () =>
    {
        expect(wrapper.find(Link)).toHaveLength(4);
    });

    it("should have a brand item", () =>
    {
        expect(wrapper.containsMatchingElement(NavbarBrand)).toBe(true);
    });

})