import React, { useEffect, useState } from "react";
import styled from "styled-components"; 
import Button from "@mui/material/Button";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import {Buffer} from "buffer"
import "./setAvatar.css"
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function SetAvatar() {
 const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
 
  const toastOptions = {
    // position: "bottom-right",
    position: "top-right",
    autoclose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => { 
    if(selectedAvatar===undefined)
    toast.error("Please Select a profile Picture",toastOptions)
    else{
      const user = localStorage.getItem("chat-app-user");
      console.log("user is ",user);
      const {data}  = await axios.post(`${setAvatarRoute}/:${user._id}`,{
        image : avatars[selectedAvatar]
      })
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        navigate("/")
      }else{
        toast.error("can't set Profile",toastOptions);
      }


    }
  };

  const fetchData = async () => {
    const api = "https://api.multiavatar.com";
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.ceil(Math.random() * 10000)}`
      );
      const buffer = new Buffer(image.data);
    data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
    
    
  };

  useEffect(() => {
    fetchData();
    
  }, []);
 
//  ''''''''''''''''''''''''''''''''''''

  return (
    <>
    {
      isLoading ?  <div className="" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100vw",  background: "linear-gradient(to right, #94dcb7, #ddddaa)"
    }}><div className="loader"></div></div>
      : 
      <Container>
      <div
        style={{
          height: "20vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Select Your Avatar Here</h1>
      </div>

      <div className="">
        <div className="avatars">
          {avatars.map((avatar, idx) => {
            return (
              <img
                key={idx}
                className={
                  selectedAvatar == idx ? "selectedImage" : "imageAvatar"
                }
                style={{
                  // width: "15vw",
                  height: "20vh",
                  // borderRadius: "50%",
                  borderRadius:"10rem",
                  margin: "5vw",
                }}
                src={`data:image/svg+xml;base64,${avatar}`}
                onClick={() => setSelectedAvatar(idx)}
                alt="avatar"
              />
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              backgroundColor: "#e0a758",
              marginTop: "4rem",
              marginBottom: "2rem",
            }}
            variant="contained"
            onClick={setProfilePicture}
          >
            Select Profile Picture
          </Button>
        </div>
      </div>
    </Container>
    }
     
      <Footer />
      <ToastContainer />
    </>
  );
}

export default SetAvatar;
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to right, #94dcb7, #ddddaa);
  .avatars {
    /* height: 100vh; */
    display: flex;
    margin-top: 10rem;

    /* align-items: center; */
    justify-content: center;
    flex-wrap: wrap;

    .selectedImage {
      border: 10px solid orange;
      /* padding: 0.4rem; */ 
    }
  }
`;
