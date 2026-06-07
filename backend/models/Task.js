import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: String,
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  estimatedMinutes: { type: Number, default: 30 },
  completed: { type: Boolean, default: false },
  completedAt: Date,
}, { timestamps: true });

taskSchema.index({ user: 1, dueDate: 1, completed: 1 });

export default mongoose.model("Task", taskSchema);
