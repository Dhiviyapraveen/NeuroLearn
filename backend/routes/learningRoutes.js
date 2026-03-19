import express from "express";
import { getLearningContent, analyzeCode } from "../controller/learningController.js";

const router = express.Router();

router.get("/", getLearningContent);
router.post("/code", analyzeCode);

export default router;