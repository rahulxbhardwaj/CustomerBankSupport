import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/userModel";
import dbConnect from "../../../lib/dbConnect";
import bcrypt from "bcryptjs";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await dbConnect();
    console.log("DB Connected");

    const { name, username, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Username already exists");
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User Registered Successfully");

    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Error Occurred while Registering User" });
  }
}
