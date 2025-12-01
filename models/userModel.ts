import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  balance: number;
  accountNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
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
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
