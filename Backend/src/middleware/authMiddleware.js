import jwt from "jsonwebtoken";
import { users } from "../model/user.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized: No token" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const user = await users
      .findById(decoded.userId)
      .select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};
