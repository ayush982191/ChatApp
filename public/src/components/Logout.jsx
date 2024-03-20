import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa";
import styled from 'styled-components';


function Logout() {
    // clg
    const navigate = useNavigate();
    const logoutUser = ()=>{
         localStorage.clear();
        navigate("/login");
    }
  return (
    <Button onClick={logoutUser} ><FaPowerOff />
    </Button>
  )
}

export default Logout

const Button = styled.div`
    background-color:  rgb(249, 224, 224 );
    padding: 1rem;
    border-radius: 20%;
    font-size: 1.5rem;
    cursor : pointer;
`