import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  currentState: String,
  lastActive: Date,
}, { timestamps: true });

export default mongoose.model("Session", sessionSchema);