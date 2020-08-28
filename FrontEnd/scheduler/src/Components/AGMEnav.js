import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import '../App.css';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../media/Logo(NText).png";


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
    render()
    {
       let customLinks=this.props.links.map((link) =>
        {
            return(
               <Nav.Link href={link.link} className="px-3"> {link.label}</Nav.Link>
            );
        });

        return(
        <StyledNav>
            <Navbar expand="lg" >
            {/*put a logo here*/}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Brand href="/" > <img src={Logo} className="logoImage" alt ="logo"/> AGME </Navbar.Brand>
                    <Nav className="m-auto">
                    {customLinks}
                    </Nav>

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

export default AGMEnav;