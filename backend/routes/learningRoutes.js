import express from "express";
import { getLearningContent } from "../controller/learningController.js";

const router = express.Router();

router.get("/", getLearningContent);

export default router;