import React, { Component } from 'react';

import ProfileInfo from "../Profile/ProfileInfo";

export default function Profile(props)
{

let links = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'View Bookings', link: '/' },
    { label: 'Create Bookings', link: '/' },
    { label: 'Sign-out', link: '/' }
]

    return (
        <div className="profileContainer">

            <ProfileInfo />

        </div>
    )
}
