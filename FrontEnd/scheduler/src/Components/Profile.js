import React from 'react';
import AGMEnav from "./AGMEnav";

export default function Profile(props)
{
    let links = [
        {label: 'Home', link: '/'},
        {label: 'Sign-out', link: '/'}
    ]
    return (<div>
        <AGMEnav links={links}/>
        this will be a profile page</div>)
}
