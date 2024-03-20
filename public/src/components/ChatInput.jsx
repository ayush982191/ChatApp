import React, { useState } from 'react'
import Picker, { Emoji } from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import styled from 'styled-components'
// import data from "@emoji"

function ChatInput({handleSendMessage}) {
  const [showEmojiPicker,setShowEmojiPicker] = useState(false);
  const [msg,setMsg] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

 const sendChat = (e)=>{
  e.preventDefault();
  if(msg.length>0){
    handleSendMessage(msg);
    setMsg("");
  }

 }


  const handleEmojiPicker = ()=>{
    setShowEmojiPicker(!showEmojiPicker);
  }
  // ------------------------------------------------------------
                        // this emoji is not working 
  const handleEmojiClick = (event,emoji) => {
   let message = msg;
   message += event.emoji;
  // console.log(event.emoji);
  // console.log(emoji);
   setMsg(message)
  }
  // ----------------------------------------------------------------
  
    
 

  return (
    <Container>
        <div onClick={handleEmojiPicker} className="buttonContainer">
            <  BsEmojiSmileFill/>
            {
              showEmojiPicker && <Picker className='emoji-picker-react' onEmojiClick={(e)=>handleEmojiClick(e)} />
                // showEmojiPicker &&  <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} native />
            }
        </div>
        <form className='inputContainer' onSubmit={sendChat}>
            <input type="text" placeholder='Enter Message' value={msg} onChange={(e)=>setMsg(e.target.value)} />
          <button type='submit' >
            <IoMdSend/>
          </button>
        </form>
    </Container>
  )
}

export default ChatInput

const Container = styled.div`
display: flex;
/* justify-content: space-evenly; */
.buttonContainer{
  font-size: 1.5rem;
  color: #845784;
  cursor: pointer;
  .emoji-picker-react{
    position: absolute;
    bottom: 9vh;
    /* width: 20vw; */
    background-color: #fad5d5;
    
  }
}
.inputContainer{
  width: 100%;
  /* height: 60%; */
  /* font-size: 2rem ; */
   border-radius: 2rem;
  display: flex;
  align-content:center;
  /* gap: 2rem; */
  background-color: #e3caef;
  input{
    width: 100%;
    /* height: 60%; */
    background-color: transparent;
    color: #4d4d4d;
    border: none;
    padding-left: 1rem;
    outline: none;
    font-size: 1.5rem;
  }
  button{
    width: 5vw;
    background-color: gray;
    border: none;
    border-radius: 2rem;
  }

}


`