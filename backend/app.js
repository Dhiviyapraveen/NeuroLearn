import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/learning", learningRoutes);

export default app;