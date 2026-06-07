import mongoose from "mongoose";

const aiEvaluationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  journal: { type: mongoose.Schema.Types.ObjectId, ref: "LearningJournal", required: true, index: true },
  score: { type: Number, min: 0, max: 10, required: true },
  concepts: [{ type: String, trim: true }],
  feedback: { type: String, required: true },
  improvementAreas: [{ type: String }],
  understandingType: { type: String, enum: ["conceptual", "mixed", "memorization"], default: "mixed" },
  rawResponse: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export default mongoose.model("AIEvaluation", aiEvaluationSchema);
