import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true, index: true },
  answer: { type: String, required: true },
  marks: { type: Number, min: 0, max: 10, default: 0 },
  corrections: String,
  mistakeExplanation: String,
  feedback: String,
  rawResponse: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export default mongoose.model("Answer", answerSchema);
