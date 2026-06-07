import express from "express";
import { createJournal, getJournalDetail, getJournals } from "../controllers/journalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getJournals);
router.post("/", createJournal);
router.get("/:id", getJournalDetail);

export default router;
