import express from "express";
import { trackBehavior } from "../controller/trackingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, trackBehavior);

export default router;