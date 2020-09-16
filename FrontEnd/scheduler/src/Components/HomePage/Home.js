
import About from "./aboutUs";
import Login from "./Login";
import React from "react";
import AGMEnav from "../Generics/AGMEnav";

function Home(props)
{
    let links = [
        {label: 'Home', link: '/'},
        {label: 'Testing a Link', link: '/'},
        {label: 'Register', link: '/register'}
    ]

    return (
        <div className="homeContainer">
        <AGMEnav links={links} />
        <About/>
        <Login />
    </div>)
}

export default Home;