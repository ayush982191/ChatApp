import React from 'react'
import Robot from "../assets/robot.gif"
import styled from 'styled-components'


function Welcome({username}) {
  return (
    <Container>
       <div className="chatWrapper">
       <img src={Robot} alt="" />
       <h1>Welcome <span>{username}</span></h1>
       <h1>Please select a chat to start Connection</h1>
       </div>
        
    </Container>
  )
}

export default Welcome
const Container = styled.div`
    .chatWrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span{
            color: #d9815e;
        }
        
    }
    

`