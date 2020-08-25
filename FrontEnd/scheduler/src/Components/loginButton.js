import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";


const StyledBut = styled.div`
  .btn {
    background-color: #303C63;
  }
`;

const handleLogin= () =>
{

}


function LoginButton(props)
{
    return (
        <StyledBut>
            <Link to="/"
            className="btn btn-lg btn-dark"
            onClick={handleLogin}>
                Login
            </Link>
        </StyledBut>
    )
}

export default LoginButton;