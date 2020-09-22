import React from "react";
import DarkButton from "./DarkButton";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter : new Adapter()});

describe("DarkButton unit test",() =>
{
    let label = {label: 'Register', link: '/'}
    const component = shallow(<DarkButton label={label}/>);

    it("should render 1 DarkButton", () =>
    {
        expect(component).toHaveLength(1);
    });

    it("should say 'Register' when passed that label", () =>
    {
        expect(component.text()).toEqual('Register');
    });

})