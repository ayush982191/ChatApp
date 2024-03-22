const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");  
// import router from "./routes/userRoutes";
const userRoutes = require("./routes/userRoutes")
const messageRoute = require("./routes/messageRoute")
const socket = require("socket.io")

const app = express();
require("dotenv").config()
app.use(cors());
app.use(express.json());


 
// console.log("MONGO_URL=",process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected"))
.catch((error)=>console.log("error in mongo connection"))



app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoute);

const port = process.env.PORT || 8000 ;

// console.log('PORT=',process.env.PORT);

const server=  app.listen(port,()=>console.log("Listning port ",port));

const io = socket(
    server,{
        cors : {
            origin : "https://chat-app-pi-jade.vercel.app",
            credentials : true,
        }
    }
)

global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        // console.log("user id is ",userId);
        onlineUsers.set(userId,socket.id)
    })
    socket.on("send-msg",(data)=>{
        // console.log("to=",data.to," and message is ",data.msg);
        const sendUserSocket = onlineUsers.get(data.to);
        // console.log("senduserSocket");
        // console.log(sendUserSocket);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.msg)
        }
    })
})