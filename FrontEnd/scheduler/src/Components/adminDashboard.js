import React from "react";
import { Tab, Tabs } from 'react-bootstrap'
import AGMEnav from "../Components/AGMEnav";
import WorkerBookingList from "../Components/WorkerBookingList";


export default function AdminDashboard(props) {
    let links = [
        { label: 'Home', link: '/' },
        { label: 'Testing a Link', link: '/dashboard' },
        { label: 'Profile', link: '/profile' },
        { label: 'Sign-out', link: '/' }
    ]

    let bookings = [
        { workerName: 'Ali ', service: "Ali's Hairdresser ", time: "13:30 ", date: "04/10" },
        { workerName: 'Max ', service: "Clearing Max ", time: "8:00 ", date: "10/10" },
        { workerName: 'Fady ', service: "Fady Car-Mechanic ", time: "15:30 ", date: "12/10" },
        { workerName: 'Zac ', service: "IT Services ", time: "11:15 ", date: "16/10" },
        { workerName: 'Ali ', service: "Ali's Hairdresses ", time: "18:45 ", date: "20/10" },
    ]
    return (
        <div className="adminDashboardContainer">
            <AGMEnav links={links} />
            <h2>Welcome username!</h2>


            <Tabs defaultActiveKey="viewBookings" id="uncontrolled-tab-example">
                <Tab eventKey="viewBookings" title="View Bookings">
                    <WorkerBookingList bookings={bookings} />
                </Tab>

                <Tab eventKey="viewWorkers" title="View Workers" disabled>
                    <WorkerBookingList bookings={bookings} />
                </Tab>
            </Tabs>

        </div>
    )
}
