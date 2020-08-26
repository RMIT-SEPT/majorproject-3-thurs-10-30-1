import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";


const StyledBut = styled.div`
  .btn {
    background-color: #303C63;
    margin-top:20px;
    
    :hover 
    {
     background-color: orange;
        color:red;
    }
    
  }
`;

const HoverText = styled.p`
	color: #000;
	:hover {
		color: #ed1212;
		cursor: pointer;
	}
`

const handleLogin= () =>
{

}



export default function DarkButton(props)
{
    let label = props.label;
    return (
        <StyledBut>
            <Link to={label.link}
            className="btn btn-lg btn-dark"
            onClick={handleLogin}>
                {label.label}
            </Link>
        </StyledBut>
    )
}