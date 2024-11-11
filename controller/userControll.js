import { UserSchema } from "../model/userModel.js";
import { login } from "./loginControll.js";

const getUserData=async(req,res)=>{
    console.log("here");
    
    const user = await UserSchema.findById(req.userId);

    if (!user) return res.status(404).send('User not found');
  console.log( user.photo );
  
    res.json({ userName: user.name, userImage: user.photo });



}

export default getUserData;
