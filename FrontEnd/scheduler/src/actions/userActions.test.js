import React from "react";
import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {getAdmin, getWorker, userCreate, userLogin} from "./userActions";


Enzyme.configure({adapter : new Adapter()});
jest.mock('axios');


let user;
let userId;
let userDetails;
let admin;
let adminId;
let newUser;
let worker;
let workerId;
beforeAll(() =>
{

    userId=4;
    user = [{accountType: "Customer",
    contactNumber: 47,
    email: "a@b.com",
    name: "Max",
    password: "password",
    userId: 4,
    username: "MaxMax"}];

    userDetails=[{
        identifier: user.email,
        password: user.password,
    }];

    newUser = [{accountType: "Customer",
        contactNumber: 911,
        email: "c@d.com",
        name: "Emily",
        password: "password",
        userId: 10,
        username: "EmEM"}];

    adminId=5;
    admin = [
        {
            business: [
                {
                    admins: [5],
                    id:2,
                    name: "main street massage",
                    services: [3],
                    workers:[3],
                }],
            id:5,
            user:[
                {
                    accountType: "Admin",
                    contactNumber: 4,
                    email: "kara@kara.com",
                    name: "Kara",
                    password: "password",
                    userId: 5,
                    username: "BigKara",
                }]
        }];

    workerId=3;

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



describe("API userActions Unit Tests",() => {
    it("should fetch an admin by an id, and return that admin", () =>
    {
        const resp = {data: admin};
        axios.get.mockResolvedValue(resp);
        return getAdmin(adminId).then(data=> expect(data.data).toEqual(admin));
    });

    it("should Login Successfully for an existing user, and return that user", () =>
    {
        const resp = {data: user};
        axios.post.mockResolvedValue(resp);
        return userLogin(userDetails).then(data=> expect(data).toEqual(user));
    });

    it("should return the user when creating a new user", () =>
    {
        const resp = {data: newUser};
        axios.post.mockResolvedValue(resp);
        return userCreate(newUser).then(data=> expect(data.data).toEqual(newUser));
    });

    it("should get a worker byID", () =>
    {
        const resp = {data: worker};
        axios.get.mockResolvedValue(resp);
        return getWorker(workerId).then(data=> expect(data.data).toEqual(worker));
    });

})