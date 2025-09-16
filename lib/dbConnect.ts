import mongoose from "mongoose"


type ConnectionObject = {
  isConnected?: number
}

const Connection: ConnectionObject = {}

async function dbConnect():Promise<void> {
  if(Connection.isConnected){
    console.log("Database is already connected");
    return;
  }

  try{
    const uri = process.env.MONGO_URI;
    console.log("Mongoose connection link :"+uri);
    const db = await mongoose.connect(uri)
    console.log("Db Connected successfully !!")
  }catch(error){
      console.log("Error in connecting to database", error);
      process.exit(1);
  }
}

export default dbConnect;