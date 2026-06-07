import mongoose from "mongoose";

const streakSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  learningCurrent: { type: Number, default: 0 },
  learningLongest: { type: Number, default: 0 },
  taskCurrent: { type: Number, default: 0 },
  taskLongest: { type: Number, default: 0 },
  journalCurrent: { type: Number, default: 0 },
  journalLongest: { type: Number, default: 0 },
  activeDates: [{ type: String }],
  taskCompletionDates: [{ type: String }],
  journalDates: [{ type: String }],
  lastLearningDate: String,
  lastTaskDate: String,
  lastJournalDate: String,
}, { timestamps: true });

export default mongoose.model("Streak", streakSchema);
