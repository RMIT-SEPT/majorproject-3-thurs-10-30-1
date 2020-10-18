import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WorkerDropDown from "./WorkerDropDown";
Enzyme.configure({adapter : new Adapter()});

let workerList = [
    {
        bookings:[1],
        businesses:[1],
        id:1,
        services:[1],
        user:{accountType:"Worker",
            contactNumber:1,
            email:"worker@worker.com",
            name:"working",
            password:"password",
            userId:1,
            username:"worker"
        }
    }
]
const wrapper = shallow(<WorkerDropDown workerList = {workerList}/>);

describe("Worker Drop Down Unit Test",() => {

    it("Should have 1 select", () =>
    {
        expect(wrapper.find('select')).toHaveLength(1);
    });

    it("Should have 2 options with one worker", () =>
    {
        expect(wrapper.find('option')).toHaveLength(2);
    });


})

