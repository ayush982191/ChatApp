const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        max : 50

    },
    email: {
        type : String,
        unique : true,
        max : 50
    },
    password : {
        type : String,
        max : 50,
        min:8
    },
    isAvatarImageSet:{
        type : Boolean,
        default : false
    },
    avatarImage : {
        type : String,
        default : ""
    }
})

const Users = mongoose.model("User",userSchema);

module.exports = {Users}