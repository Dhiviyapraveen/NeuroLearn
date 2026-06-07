import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  date: { type: String, required: true },
  learningMinutes: { type: Number, default: 0 },
  tasksCompleted: { type: Number, default: 0 },
  tasksCreated: { type: Number, default: 0 },
  journalSubmitted: { type: Boolean, default: false },
  averageEvaluationScore: { type: Number, default: 0 },
  answerScore: { type: Number, default: 0 },
}, { timestamps: true });

analyticsSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("Analytics", analyticsSchema);
