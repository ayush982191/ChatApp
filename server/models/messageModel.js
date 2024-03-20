const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    message : {
       text : { type : String,  required : true  },
    },
    users : Array,
    sender : {
// sender will be basically a user from userModel
// and in type we are providing the value as Object id(by default Provided by mongoose)

        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }

},{
    timestamps : true
})


const messageModel = mongoose.model("Message",messageSchema)

module.exports = {messageModel}