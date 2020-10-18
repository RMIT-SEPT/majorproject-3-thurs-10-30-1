import React from "react";
import {shallow} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ViewServicesList} from "./ViewServicesList";

Enzyme.configure({adapter : new Adapter()});


let service;
let wrapper;

beforeAll(()=>{
    service=
        [
            {
                name: "Massage",
                description: "Very Comfy massage",
                id: 3,
                workers: [3],
                availabilities:
                    [
                        35,
                        36,
                        37,
                        38,
                        39,
                        40,
                        41,
                        42,
                        43,
                        44,
                        45,
                        46,
                        47,
                        48,
                        49,
                        50,
                        51
                    ]
            },
        ];

    wrapper = shallow(<ViewServicesList services = {service}/>);
})


describe("Worker List Unit Test",() => {

    it("Should have 2 h4s", () =>
    {
        expect(wrapper.find('h2')).toHaveLength(1);
    });

    it("Should have 1 h2 with a certain message", () =>
    {
        expect(wrapper.find('h2').at(0).text()).toEqual("All Services");
    });


    it("Should have 1 h4 when given one service", () =>
    {
        expect(wrapper.find('h4')).toHaveLength(1);
    });

    it("Should have 2 h4s when given two bookings", () =>
    {
        service=
            [
                {
                    name: "Massage",
                    description: "Very Comfy massage",
                    id: 3,
                    workers: [3],
                    availabilities: []
                },
                {
                    name: "Haircut",
                    description: "Very Excellent Haircut",
                    id: 4,
                    workers: [1],
                    availabilities:[]
                },
            ];

        wrapper = shallow(<ViewServicesList services = {service}/>);
        expect(wrapper.find('h4')).toHaveLength(2);
    });




})