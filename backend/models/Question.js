import mongoose from "mongoose";

const generatedQuestionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  journal: { type: mongoose.Schema.Types.ObjectId, ref: "LearningJournal", required: true, index: true },
  evaluation: { type: mongoose.Schema.Types.ObjectId, ref: "AIEvaluation", required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  question: { type: String, required: true },
  expectedAnswer: String,
  concept: String,
}, { timestamps: true });

export default mongoose.model("Question", generatedQuestionSchema);
