import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav";
import '../../App.css';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import ReactRouterBootstrap, { LinkContainer } from 'react-router-bootstrap';
import {NavItem,Navbar} from "react-bootstrap";
import {NavDropdown} from "react-bootstrap";
import Logo from "../../media/Logo(Text).png";

const StyledNav = styled.div`
  .navbar {
    background-color: #303C63;
  }
  
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #FFF;
    font-size: 20px;
     padding: 2px 30px;
     
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
    }

    render()
    {
        const userLinks = (
            <Nav className="m-xl-auto">
                <NavItem> <Link to="/"> Home </Link> </NavItem>
                <NavItem> <Link to="/profile"> Profile   </Link></NavItem>
                <NavItem> <Link to ="/dashboard"> Dashboard </Link></NavItem>
                <Link to="/"> Logout </Link>
            </Nav>
        );
        const guestLinks = (
            <Nav className="m-xl-auto">
                <NavItem> <Link to="/"> Home</Link>  </NavItem>
                <NavItem> <Link to="/register"> Register </Link></NavItem>
            </Nav>
        );

        return(
        <StyledNav>
            <Navbar expand="lg" >
            {/*put a logo here*/}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Brand to="/" > <img src={Logo} className="logoImage" alt ="logo"/> AGME </Navbar.Brand>
                    {this.props.loggedIn==="LOGGED_IN" ? userLinks : guestLinks}
                    <NavDropdown title="Settings" className ="btn-group dropleft">
                        <NavDropdown.Item href="#action/3.1">Accessibility</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Contact us</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
                        </NavDropdown>

                </Navbar.Collapse>
            </Navbar>
    </StyledNav>
        )
    }

}


export default (AGMEnav);