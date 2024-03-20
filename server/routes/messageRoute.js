// export const route = "http"
// const { register, login,setAvatar,getAllUsers } = require("../controllers/userController");

// const router= require("express").Router();

// router.post("/register",register);
// router.post("/login",login);
// router.post("/setAvatar/:_id",setAvatar);
// router.get("/allusers/:_id",getAllUsers)

// module.exports = router

const {addMessage, getAllMessage} = require("../controllers/messageController")

const router = require("express").Router();
router.post("/addmsg",addMessage)
router.post("/getmsg",getAllMessage)

module.exports = router