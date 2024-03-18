const { Users } = require("../models/userModel");
const bcrypt = require("bcrypt");


module.exports.login =async (req,res,next)=>{
   try {
    const {username,password} = req.body;

    const user = await Users.findOne({username});
    if(!user){
        return res.json({
            msg : `invalid username or password`,
            status : false
        })

    } 
     const isPasswordValid =await bcrypt.compare(password,user.password);
     delete user.password;
     if(isPasswordValid){

            return res.json({
            status : true,
            user : user
        })
     }else{
        return res.json({
            status : false,
            msg : "invalid username or password"
        })
     }

   } catch (error) {
    next(error)
   }
}

module.exports.register =async (req,res,next) =>{
  try {
    const {email,password,username} = req.body;
    // console.log("enter in userContorller in ",req.body);
    const usernameCheck = await Users.findOne({username});
    if(usernameCheck){
        return res.json({
            msg : "username already exist",
            status : false
        })
    }
    const emailCheck = await Users.findOne({email})
    if(emailCheck){
        return res.json({
            msg : "email  already exist",
            status : false
        })
    }

    const hashedPassword  = await bcrypt.hash(password,10);
    const user= await  Users.create({
        email,
        username,
        password : hashedPassword
    });
    // console.log("new User is ",user);
    delete(user.password);

    return res.json({
        status : true,
        user
    })
  } catch (error) { 
        next(error) 
  }



}

module.exports.setAvatar =async (req,res,next)=>{
console.log("coming in setAvatare");
try {
    const userId = req.params._id;
    const avatarImage=req.body.avatarImage;
     
    const updatedUser = await Users.findByIdAndUpdate(userId,{
        isAvatarImageSet : true,
        avatarImage
    })


    return res.json({
        isSet : true,
        image : avatarImage
    })
    
} catch (error) {
    next(error);
    
}

}

module.exports.getAllUsers = async(req,res,next)=>{
   try {
    // console.log("coming inside getAlluser");
    // console.log("req params is ",req.params);
    const {_id} = req.params;
    // const users = Users.find({_id : {$ne: req.params.id} }).select([
    //     "email","username","avatarImage","_id"
    // ])
    const users = await Users.find({ _id: { $ne: _id } })
    .select(["email", "username", "avatarImage", "_id"]);

    return res.json({
        users 
    })
    
   } catch (error) {
    next(error);
    
   }

}











// setAvatar