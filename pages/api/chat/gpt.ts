import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  maxOutputTokens: 2048,
});

async function langApi(queryText: string){
  const res = await model.invoke([
    "Tell me the Sentiment of the following text as positive/negative/neutral: "+queryText
  ])
  return res.content;
}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 if(req.method === "POST"){
   //Extract content from request body
   const {userQuery} = req.body;
   const queryText = userQuery || "empty";

   console.log("Text Extracted :"+queryText);

   const response = await langApi(queryText);

  
   console.log("response received as "+response);
   return res.status(200).json({message: "Response received", data: response})
   
   
   
 }
}
