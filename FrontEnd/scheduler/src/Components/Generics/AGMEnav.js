import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import '../../App.css';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from  "../../media/Logo(Text).png"
import {Link} from "react-router-dom";


const StyledNav = styled.div`
  .navbar {
    background-color: #303C63;
  }
  
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #FFF;
    &:hover {
      color: black;
    }
  }
  
  .dropdown-item
  {
    color: black;
  }
`;

class AGMEnav extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            loggedIn: props.loggedIn,
            user: props.user
        }
    }

    render()
    {
        const userLinks = (
            <Nav className="m-auto">
                <Link to="/"> Home</Link>
                <Link to="/profile"> Profile </Link>
                <Link to="/"> Logout </Link>
            </Nav>
        );
        const guestLinks = (
            <Nav className="m-auto">
                <Link to="/"> Home </Link>
                <Link to="/register"> Register </Link>
            </Nav>
        );

        return(
        <StyledNav>
            <Navbar expand="lg" >
            {/*put a logo here*/}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Brand to="/" > <img src={Logo} className="logoImage" alt ="logo"/> AGME </Navbar.Brand>
                    {this.props.loggedIn ? guestLinks : userLinks }
                    <Nav>
                    <NavDropdown title="Settings" className ="btn-group dropleft">
                        <NavDropdown.Item href="#action/3.1">Accessibility</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Contact us</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    </StyledNav>
        )
    }

}


export default (AGMEnav);