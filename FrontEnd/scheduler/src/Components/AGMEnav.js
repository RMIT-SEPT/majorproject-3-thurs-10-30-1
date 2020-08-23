import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

class AGMEnav extends Component
{
    render()
    {
       let customLinks=this.props.links.map((link,index) =>
        {
            return(
                <Nav.Link href={link.link}> {link.label}</Nav.Link>
            );
        });

        return(
        <Navbar bg="darkBlue" expand="lg">
                <Navbar.Brand href="#home">AGME</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                    {customLinks}

                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }

}

export default AGMEnav;