import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Registration from "./Registration";
import {FormControl} from "react-bootstrap";

Enzyme.configure({adapter : new Adapter()});

describe("Register unit test",() => {

    const wrapper = shallow(<Registration />);
    beforeEach(() =>
    {

    })

    it("should have 5 formControl elements", () =>
    {
        expect(wrapper.find(FormControl)).toHaveLength(5);
    });
})
