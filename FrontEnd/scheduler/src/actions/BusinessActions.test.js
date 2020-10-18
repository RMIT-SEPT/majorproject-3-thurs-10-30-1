import React from "react";
import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {getAdmin} from "./userActions";
import {getAllBusiness, getAvailByService, getServiceByBusiness} from "./BusinessActions";


Enzyme.configure({adapter : new Adapter()});
jest.mock('axios');


let avail;
let service;
let worker;
let business;

beforeAll(() =>
{
    avail=[{

            id: 35,
            day: 1,
            hour: 9,
            minute: 0,
            length: 15,
            worker: 3
    }];

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
            }
        ];

    business=
        [
            {
                id: 2,
                name: "Main Street Massage",
                services: [3],
                admins: [5],
                workers: [3]
            }
        ];

    worker =[{
        id: 3,
        user: [{
            userId: 3,
            name: "Alex",
            username: "BigAl",
            password: "password",
            contactNumber: 477,
            email: "Al@Al.com",
            accountType: "Worker"
        }],
        services: [
            3
        ],
        bookings: [],
        businesses: [
            2
        ]
    }]

})

describe("API call businessActions unit Tests",() => {

    it("should fetch all businesses", () =>
    {
        const resp = {data: business};
        axios.get.mockResolvedValue(resp);
        return getAllBusiness().then(data=> expect(data.data).toEqual(business));
    });

    it("should fetch avails by service ", () =>
    {
        const resp = {data: avail};
        axios.get.mockResolvedValue(resp);
        return getAvailByService(service.id).then(data=> expect(data.data).toEqual(avail));
    });

    it("should fetch service by business ", () =>
    {
        const resp = {data: service};
        axios.get.mockResolvedValue(resp);
        return getServiceByBusiness(business.id).then(data=> expect(data.data).toEqual(service));
    });



})
