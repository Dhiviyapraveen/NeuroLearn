import express from "express";
import { createTask, deleteTask, getTasks, getTodaySummary, updateTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getTasks);
router.post("/", createTask);
router.get("/summary/today", getTodaySummary);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
