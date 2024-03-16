 
import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


function Footer() {
  return (
    <Container  >
      <div className='footerWrapper' >
    <Grid container >
        <Grid item xs={12} md={6}>
        <div>
     <p>This Website is created by Ayush kumar </p>
        <p>copyright &copy; Ayush Kumar</p>
     </div>
        </Grid>
        <Grid item xs={12} md={6}>
        <div>
        <p style={{fontWeight:"bold"}} >Connect to me @</p>
        <p>phone: 8935982191</p>
        <p> mail: <a href="mailto: ayushkumar982191@gmail.com">ayushkumar982191@gmail.com</a> </p>
     </div>
        </Grid>
    </Grid>
 

      </div>
    </Container>
  )
}

export default Footer

 const Container = styled.div`
.footerWrapper{

    background-color: #efd9c9;
     padding-bottom: 2rem;
    p{
      margin-top: 1rem;
        text-align: center;
         a{
            text-decoration: none;
            color: black;
            &:hover{
                color: #ec5f5f;

            }
        }

    }
    
}




`
