import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  accountNumber: {
    type: String,
    unique: true,
    required: true,
  }
  
},{ timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;