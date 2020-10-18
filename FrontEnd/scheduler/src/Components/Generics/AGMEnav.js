import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav";
import '../../App.css';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import {NavItem, Navbar, NavLink} from "react-bootstrap";
import {NavDropdown} from "react-bootstrap";
import Logo from "../../media/Logo(Text).png";
import { connect } from 'react-redux';
import {lilLogout} from '../../actions/userActions';
import PropTypes from 'prop-types'

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

//navBar displays different options depending on the accountType of the logged in user;

export class AGMEnav extends Component
{

    render()
    {
        let accType;
        if(this.props.user)
        {
            accType = this.props.user.accountType;
        }
        const userLinks = (
            <Nav className="m-xl-auto">
                <NavItem> <Link to="/profile"> Profile   </Link></NavItem>
                {
                    accType==="Customer"
                    ?<Nav>
                            <NavItem> <Link to ="/dashboard"> Dashboard </Link></NavItem>
                        </Nav>
                        :
                        <p></p>
                }

                {
                    accType==="Worker"
                    ?<Nav>
                        <NavItem> <Link to="/workerHome"> Worker Home </Link></NavItem>
                            <NavItem> <Link to="/Availabilities"> Availabilities </Link></NavItem>
                        </Nav>
                    : <p></p>
                }

                {
                    accType==="Admin"
                        ? <Nav>
                            <NavItem> <Link to="/adminHome"> Admin Home </Link></NavItem>
                            <NavItem> <Link to="/workerMaker"> Create a Worker </Link></NavItem>
                            <NavItem> <Link to="/serviceMaker"> Create a Service </Link></NavItem>
                        </Nav>
                        : <p></p>
                }
                <NavLink className="logout" href="/" onClick={this.props.logout}> Logout </NavLink>
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
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Brand to="/" > <img src={Logo} className="logoImage" alt ="logo"/> AGME </Navbar.Brand>
                    {this.props.user ? userLinks : guestLinks}
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
AGMEnav.propTypes = {
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {accountType}= state.accountType;
    return {
        user,
        accountType,
    };
}

export default connect(mapStateToProps, {lilLogout })(AGMEnav);