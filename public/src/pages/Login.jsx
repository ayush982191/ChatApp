import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Footer from "../components/Footer";
import { Link, json, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { loginRoute } from "../utils/apiRoutes";
 
function Login() {

  const [values, setValues] = useState({
    username: "",
     password: "",
   });
   const navigate = useNavigate();
   

   useEffect(()=>{
    let user = localStorage.getItem("chat-app-user");
    user = JSON.parse(user)
  //  if(user){
  //   console.log("user =",user);
  //   console.log("coming inside login");
  //   navigate("/")
  //  }
  if(user){
    navigate("/")
  }
   },[])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation(values)){
      const { username, password } = values;
      const {data} = await axios.post(loginRoute,{
        username,
         password,
       })
      //  console.log("message sent successfully");
      //  console.log(data);
      if(data.status){ 
        console.log("data is ",data);
        console.log("user is ",data.user);
        localStorage.setItem("chat-app-user",JSON.stringify(data.user))
        // toast.success(`${data.user.username} created`,toastOptions)
       navigate("/")
      }else{ 
        toast.error(data.msg,toastOptions)
      }

      

    }
    // alert("form sumbit")
  };
  const toastOptions = {
    position: "bottom-right",
    // position:'top-right',
    autoclose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleValidation = ({ username, email, password, confirmPassword }) => {
    //  console.log(password==confirmPassword);
    if (username == "") {
      toast.error("username can not be empty", toastOptions);
      return false;
    }
    if (password == "") {
      toast.error("password can not be empty", toastOptions);
      return false;
    } 
    

    return true;

    // if(password.length<8)
    // toast.error("sorry, password should be at least 8 characters",toastOptions) ;
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log("name is ",name," and value is ",value);
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <>
      <Container>
        <h1>
          Welcome to <span>Ayush Chats</span>
        </h1>

        <h3>Login</h3>
        <Box>
          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              md={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img src="xyz" alt="errorr" />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="formWrapper">
                <form className="formInputs" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="username"
                    placeholder="username"
                  />
                 
                  <input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    placeholder="Enter Password"
                  />
                  
                  <Button
                    style={{ backgroundColor: "#92e574", marginTop: ".5rem" }}
                    type="submit"
                    variant="contained"
                  >
                    Login
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
          {/* <div className='LoginDiv' >
              <p>Already having an account? <div><Link style={{padding:".5rem",color:"black",textDecoration:"none"}} to="/login" >Login</Link></div></p>
         </div> */}
          <div className="LoginDiv">
            <p>create an Account</p>
            <div>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="/register"
              >
                Register
              </Link>
            </div>
          </div>
          {/* <Link to="/login" >Enter</Link> */}
        </Box>
      </Container>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default Login;

const Container = styled.div`
  h1 {
    text-align: center;
    margin-bottom: "5rem";
    padding: 1.5rem;
  }
  h3 {
    text-align: center;
    margin-bottom: 5rem;
  }
  background: linear-gradient(to right, #94dcb7, #ddddaa);

  /* height: 100vh; */
  .formWrapper {
    border: 5px solid #e9bf9f;
    width: 50vw;
    border-radius: 20px;
    margin: 0 5vw;

    .formInputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      input {
        width: 40vw;
        /* height: 2rem; */
        font-size: 16px;
        padding: 0.8rem;
        border: 2px solid gray;
        display: block;
        margin: 1rem;
        text-align: center;
        border-radius: 6px;
      }
    }
  }
  .LoginDiv {
    display: flex;
    /* flex-direction: column; */
    /* align-items: center; */
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    p {
      padding: 0.5rem;
    }
  }
`;
