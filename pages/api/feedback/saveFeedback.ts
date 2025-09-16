import type { NextApiRequest, NextApiResponse } from "next";
import {NextResponse} from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Feedback from "../../../models/feedbackSchema"


export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === "POST"){
    //Extract content from request body
    const {message} = req.body;
    console.log("Message received as :"+message);
    console.log("Try Connecting to DB");
    await dbConnect();
    console.log("DB Connected");
    const feedback = new Feedback({
      message: message,
      createdAt: new Date(),
    });
   if(await feedback.save()){
     console.log("Feedback saved successfully !!");
   }else{
     console.log("Error in saving feedback");
   }
    
    return res.status(201).json(feedback);

  }
}