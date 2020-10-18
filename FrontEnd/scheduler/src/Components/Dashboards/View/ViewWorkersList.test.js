import React from "react";
import {shallow} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ViewWorkersList} from "./ViewWorkersList";

Enzyme.configure({adapter : new Adapter()});


describe("Worker List Unit Test",() => {

    let services;
    let workers;

    beforeAll(()=>
    {
        services=
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
                    workers: [3],
                    availabilities:[]
                },
                {
                    name: "Massage",
                    description: "Very Lovely Massage",
                    id: 5,
                    workers: [1],
                    availabilities:[]
                },
            ];

        workers =[{
            id: 3,
            user: [
                {
                userId: 3,
                name: "Alex",
                username: "BigAl",
                password: "password",
                contactNumber: 477,
                email: "Al@Al.com",
                accountType: "Worker"
            }],
            services: [3,4],
            bookings: [],
            businesses: [2]
        },
        {
            id: 1,
            user: [{
                userId: 1,
                name: "Al",
                username: "BiggerAl",
                password: "password",
                contactNumber: 4577,
                email: "Al@BigAl.com",
                accountType: "Worker"
            }],
            services: [5],
            bookings: [],
            businesses: [2]
        }
        ]
    })


    it("Should have 2 h4s with 2 workers", () =>
    {
        const wrapper = shallow(<ViewWorkersList workers={workers} services={services}/>)
        expect(wrapper.find('h2')).toHaveLength(1);
    });

    it("Should have 3 li's with 3 services", () =>
    {
        const wrapper = shallow(<ViewWorkersList workers={workers} services={services}/>)
        expect(wrapper.find('li')).toHaveLength(3);
    });


})