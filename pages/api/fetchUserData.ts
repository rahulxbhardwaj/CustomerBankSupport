import dbConnect from "../../lib/dbConnect"
import User from "../../models/userModel"
import jwt from "jsonwebtoken";
import Transaction from "../../models/transcation"
import { NextApiRequest, NextApiResponse } from "next";

interface DecodedToken {
  userId: string;
  username?: string;
  iat?: number;
  exp?: number;
}

interface PopulatedUser {
  name: string;
  accountNumber: string;
}

interface PopulatedTransaction {
  _id: string;
  amount: number;
  date: Date;
  sender: PopulatedUser;
  receiver: PopulatedUser;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "GET"){
    try{
      await dbConnect();
      const token = req.cookies.token;
      
      if(!token){ return res.status(401).json({message: "Token not found"})};

      const decoded = jwt.decode(token) as DecodedToken | null;
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ message: "Invalid token" });
      }
  
      const user = await User.findById(decoded.userId).select("-password");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const recentTransactions = await Transaction
        .find({
          $or: [
            { sender: user._id },
            { receiver: user._id }
          ]
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("sender", "name accountNumber")
        .populate("receiver", "name accountNumber")
        .lean() as unknown as PopulatedTransaction[];
     
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