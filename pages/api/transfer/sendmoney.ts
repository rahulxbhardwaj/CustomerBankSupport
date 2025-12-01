import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/dbConnect";
import Transaction from "../../../models/transcation";
import User from "../../../models/userModel";
import client from "../../../lib/chromaConnect";
import { getEmbedding } from "../../../lib/embeddings";
import mongoose from "mongoose"

export default async function POST(req: NextApiRequest, res: NextApiResponse){
  await connectDB();

  try{
    
    const { senderId, receiverId, amount, message } = await req.body;

    if (!senderId || !receiverId || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
  }
    // Use findOne() to retrieve the first document that matches the query
    const sender = await User.findOne({ accountNumber: senderId }).exec();
    const receiver = await User.findOne({ accountNumber: receiverId }).exec();

  if(!sender || !receiver){
    return res.status(404).json({ message: "Sender or receiver not found" });
  }

  if(sender.balance < amount){
    return res.status(400).json({ message: "Insufficient balance in Sender's account" });
  }
 
  sender.balance -= amount;
  receiver.balance += amount;
  await sender.save();
  await receiver.save();

  //Save Transcation Record
    const transaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      message,
      balance: sender.balance,
    
    });

    await transaction.save();

    // -------------------------------
    // Ingest transaction into ChromaDB
    // -------------------------------

    try {
      const collection = await client.getCollection({ name: "transactions" }).catch(() =>
        client.createCollection({
          name: "transactions",
        })
      );


      const txText = `Sender: ${sender.name}, Receiver: ${receiver.name}, Amount: ${amount} in INR, Message: ${message}`;

      // 1️⃣ Generate embedding from Gemini
      const embedding = await getEmbedding(txText);

      // 2️⃣ Ensure embedding is 1D array
      if (!Array.isArray(embedding)) throw new Error("Embedding is not an array");

      await collection.add({
        ids: [transaction._id.toString()],
        embeddings: [embedding], // must be 2D array
        metadatas: [{ text: txText }],
      });

    } catch (chromaErr) {
      console.error("Error saving transaction to ChromaDB:", chromaErr);
    }




    

    return res.status(200).json({ message: "Transaction successful" })
    
}catch(error){
    console.error("Error in transfer/sendmoney.ts: ",error);
    return res.status(500).json({ message: "Server error" });
  }
}