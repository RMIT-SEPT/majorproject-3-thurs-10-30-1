import React from "react";
import {AGMEnav} from "./AGMEnav";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {NavbarBrand, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";
import configureStore from "redux-mock-store";
import Dashboard from "../Dashboards/Dashboard";


Enzyme.configure({adapter : new Adapter()});

const initialState = {
    auth:
        {
            user:
                [
                    {
                        accountType:"Admin",
                        contactNumber:47,
                        email:"m@m.com",
                        password:"p",
                        userId:4,
                        username:"MaxMax"
                    }
                ],
            isLoggedIn:true,
        },
    accountType:{accountType: "Admin"}

};

const mockStore = configureStore();
let wrapper;
let store;
const mockFn = jest.fn();

beforeEach(() =>{

    store=mockStore(initialState);
    console.log(store);
    wrapper = shallow(<AGMEnav store={store} logout={mockFn}/>);
})


describe("AGMEnav unit test",() =>
{

    it("should have 2 navlink items while a user it not logged in", () =>
    {
        expect(wrapper.find(Link)).toHaveLength(2);
    });

    it("should have a brand item", () =>
    {
        expect(wrapper.containsMatchingElement(NavbarBrand)).toBe(true);
    });

})