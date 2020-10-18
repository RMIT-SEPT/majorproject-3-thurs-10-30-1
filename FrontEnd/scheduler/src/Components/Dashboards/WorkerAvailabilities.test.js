import React from "react";
import {shallow} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {WorkerAvailabilities} from "./WorkerAvailabilities";

Enzyme.configure({adapter : new Adapter()});


const user = [{accountType: "Customer",
    contactNumber: 47,
    email: "a@b.com",
    name: "Max",
    password: "password",
    userId: 4,
    username: "MaxMax"}];

const isLoggedIn=true;

const accountType="Customer";


const wrapper = shallow(<WorkerAvailabilities user={user} isLoggedId={isLoggedIn} accountType={accountType}/>);

describe("Worker Availabilities Unit Test",() => {

    it("Should have 1 TimePicker", () =>
    {
        expect(wrapper.find('TimePicker')).toHaveLength(0);
    });


})
