import { users } from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  try {
    if ((!fullname, !username, !email, !password))
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await users.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const existingUsername = users.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await users.create({
      username: username.toLowerCase(),
      fullname,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create a user", error: error.message });
  }
};

export const login = async (req, res) => {};
