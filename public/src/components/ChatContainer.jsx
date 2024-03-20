import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from "axios"
import { getAllMessagesRoute, sendMessageRoute } from '../utils/apiRoutes'
import {v4 as uuidv4} from "uuid"


function ChatContainer({selectedContact , currentUser , socket }) {
  // console.log("SElected contact is ",selectedContact.username);
  const [messages,setMessages] = useState([]);
  const [arrivalMessage,setArrivalMessage] = useState(null);
  const scrollRef = useRef()

// own logic 
// ---becoiming smart 
const fetchAllMessages = async ()=>{
 if(selectedContact){
  const response = await axios.post(getAllMessagesRoute,{
    from : currentUser._id,
    to : selectedContact._id,
  })
  // console.log("responsde coming is ",response.data);
  setMessages(response.data)
 }
}
const handleSendMessage =async (msg)=>{
    
  // using my own brain 
  // let username =await localStorage.getItem("chat-app-user");
  // username = JSON.parse(username);
  // console.log("user name is ",username.username);
   // const response = await axios.post(sendMessageRoute,{
  //   from : username.username,
  //   to : selectedContact.username,
  //   message : msg
  // })
  // console.log("current user is ",currentUser);
   const response = await axios.post(sendMessageRoute,{
    from : currentUser._id,
    to : selectedContact._id,
    message : msg
  })

  socket.current.emit("send-msg",{
    to : selectedContact._id,
    from : currentUser._id,
    msg : msg
  })
// -------------------------------------------
  const msgs = [...messages];
  msgs.push({fromSelf : true,message : msg});
  // console.log("messages r",msgs);
  setMessages(msgs);


  // console.log("response is ",response);

}

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        setArrivalMessage({fromSelf : false,message : msg})
      })
    }

  },[])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])

  },[arrivalMessage])

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;    }
    
  },[messages])

  useEffect(()=>{
    fetchAllMessages();
  },[selectedContact])
 
  return (
    <Container>
     <div className="chatWrapper">
     <div className="navbar">
    <div className="avatarLogoAndImage">
    <img src={`data:image/svg+xml;base64,${selectedContact.avatarImage}`} alt="" />
     <h1>{selectedContact.username}</h1>
    </div>
     <Logout/>
        
        </div>
        {/* <Messages/> */}
        <div className="chatMessage" ref={scrollRef} >
          {
            messages.map((msg,idx)=>{
              return <div key={uuidv4()}  className="chats">
                 <p className={`chat ${msg.fromSelf ? "sender" : "receiver"} `} >{msg.message}</p>
              </div>
            })
          }
        </div>
        <ChatInput handleSendMessage={handleSendMessage} />
     </div>

      
    </Container>
  )
}

export default ChatContainer
const Container = styled.div`
    
    /* style={{backgroundColor:"pink",height:"100%"}}  */
    background-color: #ffe7ea;
    /* height: 100%; */
    /* position: relative; */
    .chatWrapper{
      .navbar{
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #efc6c6;
        .avatarLogoAndImage{
        
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2vw; 
        img{
          height: 12vh;
        }

         
      }
      }
      .chatMessage{ 
        overflow: auto;
        height: 80vh;
        .chats{ 
          word-wrap: break-word;
           
            .sender{
              color: #393838; 
              justify-content: flex-end;
              margin-left: 30vw;
              margin-bottom: 2.5vh;
              /* margin-right: 1vw; */
              border: 2px solid #393838;
              border-radius: 10px;
              /* display: inline; */
              background-color: wheat;
              padding: 0.5rem;
              width: 20vw;


            }
            .receiver{ 
              color: #f2f2f2;
              margin-bottom: 2.5vh;
              margin-left: 2vw;
              background-color: #929292;
              width: 20vw;
              padding: 0.5rem;
              border-radius: 10px;
              /* display: flex;
              justify-content: flex-start; */
            } 
        }
      }
    }

`