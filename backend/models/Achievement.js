import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  level: { type: String, enum: ["bronze", "silver", "gold", "champion"], default: "bronze" },
  awardedAt: { type: Date, default: Date.now },
}, { timestamps: true });

achievementSchema.index({ user: 1, code: 1 }, { unique: true });

export default mongoose.model("Achievement", achievementSchema);
