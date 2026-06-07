import express from "express";
import { getAnalyticsDashboard } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAnalyticsDashboard);

export default router;
