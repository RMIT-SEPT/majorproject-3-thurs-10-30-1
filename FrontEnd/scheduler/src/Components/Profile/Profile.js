import React, { Component } from 'react';
import { Grid, Row, Col, Image, Container, Button } from 'react-bootstrap';
import AGMEnav from "../Generics/AGMEnav";


let links = [
    { label: 'Home', link: '/' },
    { label: 'Sign-out', link: '/' }
];
export default function Profile(props) {
    return (
        <div>
            <AGMEnav loggedIn={this.props.loggedIn}/>

            <Container fluid>
                <Row>
                    <Col>
                        <Image src="holder.js/171x180" roundedCircle />
                    </Col>
                    <Col>
                        
                        <h2>Worker Name</h2>
                        <p>Ph: 0400 000 000</p>
                        <p>E-mail: worker@email.com</p>
                        <p>Worker ID: 1234567890</p>
                        <p>Availability: Monday 9:00 AM - 5:00 PM  <Button variant="success" size="sm">Update</Button>{' '}</p>
                        <Button variant="danger" size="lg">View Worker Bookings </Button>{' '}

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

