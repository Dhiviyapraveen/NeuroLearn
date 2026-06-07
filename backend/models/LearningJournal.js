import mongoose from "mongoose";

const learningJournalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  content: { type: String, required: true, trim: true },
  studyMinutes: { type: Number, default: 0 },
  mood: { type: String, enum: ["focused", "neutral", "tired", "confused"], default: "neutral" },
  tags: [{ type: String, trim: true }],
  entryDate: { type: Date, default: Date.now, index: true },
}, { timestamps: true });

learningJournalSchema.index({ user: 1, entryDate: -1 });

export default mongoose.model("LearningJournal", learningJournalSchema);
