import {NextResponse} from "next/server";

export default function handler(req , res){
  if(req.method === "POST"){
    // Clear the token cookie
    res.setHeader("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0;            SameSite=Strict; Secure");

    return res.status(200).json({message: "Logout Successful"});
    
  }else{
    return res.status(405).json({message : "Method Not Allowed"})
  }
}