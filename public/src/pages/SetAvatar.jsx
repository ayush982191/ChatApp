import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import Button from '@mui/material/Button';
import Footer from "../components/Footer"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { setAvatarRoute } from '../utils/apiRoutes'
import {useNavigate} from "react-router-dom" 


function SetAvatar() {
  const [avatars,setAvatars] = useState([img1,img2,img3,img4]);
  const [imageSelected,setImageSelected] = useState(undefined);
  const navigate = useNavigate();

  const selectImage=(idx)=>{
     setImageSelected(idx);
  }
  const toastOptions = {
    // position: "bottom-right",
    position:'top-right',
    autoclose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const saveAvatar=async()=>{
    console.log("selecting an avatar ",imageSelected);
    if(imageSelected==undefined){ 
      toast.error("please select an avatar",toastOptions)
    }else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      let reader = new FileReader();
        reader.readAsDataURL(avatars[imageSelected]);
        // console.log("converted image is ",reader.result);
        reader.onload=()=>{
          console.log("converted Image");
          console.log(reader.result);
        }
        reader.onerror= error=>{
          console.log("error ",error);
        }



      const {data} = axios.post(`${setAvatarRoute}/${user._id}`,{
        image : avatars[imageSelected],
      })
      if(data.isSet){
        user.isAvatarImageSet = true;
        // user.avatarImage =data.image;
        





        localStorage.setItem('chat-app-user',JSON.stringify(user));
        navigate("/");
      }else{
        toast.error("Error in setting avatar, please try again",toastOptions)
      }

    }
    
  }

  return (
   <>
   
   <Container>
        <div style={{  height:"20vh", display:"flex",alignItems:'center',justifyContent:"center" }} >
            <h1  >Select Your Avatar Here</h1>
        </div>
        
        <div className=""  >
          <div className="avatars"  >
          {avatars.map((item,idx)=>{
        return <img key={idx} className={imageSelected==idx ? "selectedImage":"imageAvatar"}  style={{width:"15vw",height:"20vh",borderRadius:"500px",margin:"10px"}} onClick={()=>selectImage(idx)} src={item} alt="" />
      })}
          </div >
          <div style={{display:"flex",justifyContent:"center" }}>
          <Button onClick={saveAvatar} style={{backgroundColor:"#e0a758",marginTop:"4rem",marginBottom:"2rem"}} variant='contained' >Select Image</Button>
          </div>
        </div>
        
     </Container>
     <Footer/>
     <ToastContainer/>

     </>
  
  )
}

export default SetAvatar
const Container=styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(to right, #94dcb7, #ddddaa);
    .avatars{
      /* height: 100vh; */
      display: flex;
      margin-top: 10rem;
      
      /* align-items: center; */
      justify-content: center;
      flex-wrap: wrap;

      .selectedImage{
      border: 3px solid orange;
    }
      
    }

`