import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
import User from "../../../models/userModel";

export default async function handler(req , res){
  
  if(req.method === "POST"){
    
  const {username , password} = req.body;
    
  try{
    await dbConnect();
    const user = await User.findOne({username});

    if(!user){
      console.log("User not found at backend")
      return res.status(400).json({message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
      return res.status(400).json({message: "Invalid Credentials"});
    }

    //Create a JWT token
    const token = jwt.sign({userId: user._id} , process.env.JWT_SECRET , {expiresIn: "1h"});
    console.log("Token at backend: "+ token);

    // Try to set cookie (may not work in Replit iframe)
    res.setHeader('Set-Cookie', `authToken=${token}; Path=/; Max-Age=3600; SameSite=None; Secure`);
    console.log("Cookie attempted");

    console.log("password at backend :"+ password , "username at backend: "+ username , )
    // Also return token for localStorage fallback
    res.status(200).json({token, message: "Login Successful"})
    

    
  }catch(error){
    console.error("Login error:", error);
    return res.status(500).json({ message: "Error Occurred while Logging In" });
  }
  
    
  }else{
    return res.status(405).json({message: "Method Not Allowed"})
  }
}