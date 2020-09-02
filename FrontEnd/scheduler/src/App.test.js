import React from 'react';
import App from "./App";
import Enzyme, {shallow,mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";


Enzyme.configure({adapter : new Adapter()});

it('renders without crashing', () => {
      shallow(<App />)
});
