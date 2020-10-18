import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MyCal from "./myCal";
import {shallow} from "enzyme";
import {Calendar} from "react-calendar";
Enzyme.configure({adapter : new Adapter()});
let wrapper;



beforeAll(()=>{
    wrapper=shallow(<MyCal/>)
})

    describe("MyCal Unit Tests",() => {

        it("should render 1 component without crashing", () =>
        {
            expect(wrapper.find(Calendar)).toHaveLength(1);
        })

    });
