import React, { useEffect, useState ,useRef } from 'react'
import styled from "styled-components"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from "axios"
import {json, useNavigate} from "react-router-dom"
import { allUsersRoute, host } from '../utils/apiRoutes';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client"



function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined);
  const [ischatSelected, setIsChatSelected] = useState(false);
  const [selectedContact,setSelectedContact] = useState({});





  const fetchContacts  = async ()=>{
    // console.log("Coming inside fetchContacs");
    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
    // console.log("data coming is ",data);
    setContacts(data.data.users)
 
  }
  const generateCurrentUser = async ()=>{
    // console.log("coming in current user");
    setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
  }
 

  useEffect(()=>{
    const user = localStorage.getItem("chat-app-user");
    // console.log("user is ",user);
    if(!user)
    navigate("/login"); 
    // fetchContacts()
    generateCurrentUser()
  },[])
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);                        
    }
  },[currentUser])




  useEffect(()=>{
    // console.log("when current user change,new Usereffect",currentUser);
    if(currentUser){
      if(currentUser.isAvatarImageSet){
        fetchContacts()
      }else{
        navigate("/setAvatar")
      }


    } 

  },[currentUser])






  return (
    <Container>
      <Box>
        <Grid style={{ width:"100vw",height:"100vh"}} container spacing={2} >
          <Grid item xs={1} ></Grid>
          <Grid item xs={3} style={{backgroundColor:"#f8f7e8"}} > 
          {/* peopel */}
          <h1>Your Chats</h1>
          <Contact contacts={contacts} currentUser={currentUser} setSelectedContact={setSelectedContact} setIsChatSelected={setIsChatSelected} />
          {currentUser != undefined ? <div className="userName">
    <h1>{currentUser?.username}</h1>
    <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="" />

    </div> :""}
          
          </Grid>
          <Grid item xs={7}  style={{backgroundColor:"#ffe7ea"}} >
            {!ischatSelected ? <Welcome username={currentUser?.username} /> : <ChatContainer selectedContact={selectedContact} socket={socket} currentUser={currentUser} /> }
          </Grid>  
          <Grid item xs={1} ></Grid>

        </Grid>
        

      </Box>
    </Container>
  )
}

export default Chat

const Container = styled.div`
h1{
  text-align: center;
  padding: 0.4rem;
}
  .userName{
    background-color: rgb(232, 206, 206,0.4);
    /* background-color: #c11d1b; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    /* gap: 5rem; */
    /* padding: 0; */
    /* gap: 2rem; */
    /* margin: 1rem; */
    /* margin-right: auto; */
    /* width: 100%; */

    img{
      width: 7vw;
    }
  }

`