import express from "express";
import { getAnswers, submitAnswer } from "../controllers/answerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getAnswers);
router.post("/:questionId", submitAnswer);

export default router;
