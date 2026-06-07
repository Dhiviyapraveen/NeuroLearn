import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "NeuroLearn API" }));
app.use("/api/auth", authRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ msg: err.message || "Server error" });
});

export default app;
