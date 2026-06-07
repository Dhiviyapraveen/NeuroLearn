import User from "../models/User.js";
import Task from "../models/Task.js";
import LearningJournal from "../models/LearningJournal.js";
import AIEvaluation from "../models/AIEvaluation.js";

export const getAdminStats = async (req, res) => {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [totalUsers, activeUsers, tasks, journals, evaluations] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ lastLoginAt: { $gte: since } }),
    Task.countDocuments(),
    LearningJournal.countDocuments(),
    AIEvaluation.countDocuments(),
  ]);

  res.json({ totalUsers, activeUsers, tasks, journals, evaluations });
};

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 }).limit(100);
  res.json(users);
};

export const updateUserRole = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select("-password");
  res.json(user);
};
