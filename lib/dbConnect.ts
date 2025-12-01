import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const Connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (Connection.isConnected) {
    return;
  }

  try {
    const uri = process.env.MONGO_URI;
    
    if (!uri) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    const db = await mongoose.connect(uri);
    Connection.isConnected = db.connections[0].readyState;
    console.log("Db Connected successfully !!");
  } catch (error) {
    console.error("Error in connecting to database", error);
    throw error;
  }
}

export default dbConnect;