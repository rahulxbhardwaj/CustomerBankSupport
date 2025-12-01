import mongoose, { Document, Model, Types } from "mongoose";

export interface ITransaction extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  amount: number;
  date: Date;
  balance: number;
  message?: string;
}

const TransactionSchema = new mongoose.Schema<ITransaction>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  balance: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  }
});

const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
