const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");  
// import router from "./routes/userRoutes";
const userRoutes = require("./routes/userRoutes")



const app = express();
require("dotenv").config()
app.use(cors());
app.use(express.json());


 
console.log("MONGO_URL=",process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected"))
.catch((error)=>console.log("error in mongo connection"))



app.use("/api/auth",userRoutes);



console.log('PORT=',process.env.PORT);
const port = process.env.PORT ;
app.listen(port,()=>console.log("Listning port ",port));

