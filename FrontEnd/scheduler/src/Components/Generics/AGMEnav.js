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

export class AGMEnav extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            worker: false,
            currentUser: {}
        };
    }
    componentDidMount() {
        const user = this.props.user;
        if (user)
        {
            this.setState({
                currentUser: user,
                worker: user.accountType==="Worker",
                admin: user.accountType==="Admin"
            });
        }
    }

    render()
    {
        const userLinks = (
            <Nav className="m-xl-auto">
                <NavItem> <Link to="/profile"> Profile   </Link></NavItem>
                <NavItem> <Link to ="/dashboard"> Dashboard </Link></NavItem>

                {
                    this.state.worker
                    ? <NavItem> <Link to="/workerHome"> Worker Home </Link></NavItem>
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
    return {
        user,
    };
}

export default connect(mapStateToProps, {lilLogout })(AGMEnav);