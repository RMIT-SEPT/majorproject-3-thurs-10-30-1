import React from "react";
import {shallow} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Dashboard from "./Dashboard";
import configureStore from 'redux-mock-store'
import {BookingList} from "../Bookings/BookingList";
import BookingCreator from "../Bookings/BookingCreator";

Enzyme.configure({adapter : new Adapter()});

const initialState = {
    auth:
        {
            user:
                [
                    {
                        accountType:"Customer",
                        contactNumber:47,
                        email:"m@m.com",
                        password:"p",
                        userId:4,
                        username:"MaxMax"
                    }
                    ],
            isLoggedIn:true,
        },
    accountType:{accountType: "Customer"}

};

const mockStore = configureStore();
let wrapper;
let store;

beforeEach(() =>{

    store=mockStore(initialState);
    wrapper = shallow(<Dashboard store={store}/>);
})


describe("Dashboard Unit Test",() => {

    it("should have a booking list", () =>
    {
        expect(wrapper.find(BookingList)).toHaveLength(1);
    });


    it("should have a booking creator", () =>
        {
            expect(wrapper.find(BookingCreator)).toHaveLength(1);
        });

    it("should have a div", () =>
    {
        expect(wrapper.find('div')).toHaveLength(1);
    });

    it("should have a redirect", () =>
    {
        expect(wrapper.find('Redirect')).toHaveLength(1);
    });


            
    })    