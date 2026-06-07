import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: "Name, email, and password are required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ msg: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  const token = signToken(user);
  res.json({ name: user.name, email: user.email, role: user.role, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  user.lastLoginAt = new Date();
  await user.save();

  const token = signToken(user);
  res.json({ name: user.name, email: user.email, role: user.role, token });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    user.resetPasswordToken = Math.random().toString(36).slice(2);
    user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();
  }
  res.json({ msg: "If the email exists, a reset token has been generated.", resetToken: user?.resetPasswordToken });
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const allowed = ["name", "bio", "avatarUrl", "targetStudyMinutes"];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
  const user = await User.findByIdAndUpdate(req.user, updates, { new: true }).select("-password");
  res.json(user);
};
