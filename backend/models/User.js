import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  avatarUrl: String,
  bio: String,
  targetStudyMinutes: { type: Number, default: 120 },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLoginAt: Date,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
