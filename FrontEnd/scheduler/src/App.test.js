import React from 'react';
import App from "./App";
import Enzyme, {shallow,mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {Provider} from "react-redux";
import store from "./store";



Enzyme.configure({adapter : new Adapter()});

it('renders without crashing', () => {
      mount(<Provider store = {store}> <App /></Provider>)

});
