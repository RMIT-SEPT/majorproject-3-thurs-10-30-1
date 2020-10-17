import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WorkerDropDown from "./WorkerDropDown";
Enzyme.configure({adapter : new Adapter()});

let workerList = [
    {availability:1,
        customer:4,
        date:"2020-10-12",
        id:1,
        service:1,
        start_time:"2020-10-12",
        status:"booked"
    }
]
const wrapper = shallow(<WorkerDropDown workerList = {workerList}/>);

describe("Worker Drop Down Unit Test",() => {})

