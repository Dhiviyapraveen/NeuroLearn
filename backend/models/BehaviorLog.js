import mongoose from "mongoose";

const behaviorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  typingSpeed: Number,
  backspaceCount: Number,
  mouseSpeed: Number,
  pauseTime: Number,
}, { timestamps: true });

export default mongoose.model("BehaviorLog", behaviorSchema);