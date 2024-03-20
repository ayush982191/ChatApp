// import { Users } from "../models/userModel";
// import { message } from "../models/messageModel";
const {messageModel} = require("../models/messageModel");
const addMessage = async (req, res, next) => {
  try {
    // console.log("coming inside addMessages");
    const { from, to, message } = req.body;
    // console.log("Req body is ");
    // console.log(req.body);
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data)
      return res.json({
        msg: "Message added sucessfully",
      });
      return res.json({
        msg : "Fail to add message to database"
      })
      
  } catch (error) {
    next(error);
  }
};

const getAllMessage = async (req, res, next) => {
  try {
    // console.log("Coming inside getAllMessage");
    const {from,to} = req.body;
    // console.log("from is ",from," and to is ",to);
    const messages = await messageModel.find({
      users : {
        $all : [from,to],
      },
     }).sort({ updatedAt : 1});
    // console.log("messages are ",messages);
    const projectedMessages = messages.map((msg)=>{
      return {
        fromSelf : msg.sender.toString() === from,
        message : msg.message.text
      }
    })
    // console.log("projected",projectedMessages);
    return res.json(projectedMessages)


  } catch (error) {
    next(error);
  }
};

module.exports = { addMessage, getAllMessage };
