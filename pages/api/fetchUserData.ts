import dbConnect from "../../lib/dbConnect"
import User from "../../models/userModel"
import {jwtVerify} from "jose";
import jwt from "jsonwebtoken";
import transcation from "../../models/transcation"

export default async function handler(req , res){
  if(req.method === "GET"){
    try{
      await dbConnect();
      const token = req.cookies.token;
      
      if(!token){ return res.status(401).json({message: "Token not found"})};

      // Decode JWT (no need to verify middleware already did)
      const decoded = jwt.decode(token); // contains username, id, etc.
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
     
      // Optionally, fetch more user info from DB
      const user = await User.findById(decoded.userId).select("-password"); // exclude password

      // Fetch latest 5 transactions sent by the user
      const recentTransactions = await transcation
        .find({
          $or: [
            { sender: user._id },
            { receiver: user._id }
          ]
        })
        .sort({ createdAt: -1 }) // latest first
        .limit(5).populate("sender", "name accountNumber")
        .populate("receiver", "name accountNumber");

    
     
      return res.status(200).json({
        name: user.name,
        accountNumber: user.accountNumber,
        
        balance: user.balance,
        recentTransactions: recentTransactions.map(tx => ({
          _id: tx._id,
          amount: tx.amount,
          date: tx.date,
          sender: {
            name: tx.sender.name,
            accountNumber: tx.sender.accountNumber,
          },
          receiver: {
            name: tx.receiver.name,
            accountNumber: tx.receiver.accountNumber,
          },
        })),
      });

      
    }catch(error){
      console.error("Error fetching user data:", error);
      return res.status(500).json({ message: "Server error" });
    }
    
  }else{
    return res.status(405).json({message: "Method Not Allowed"})
  }
}