import express from "express";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());

import authRoute from "./routes/authRoutes.js";

app.use("/api/v1/auth", authRoute);
