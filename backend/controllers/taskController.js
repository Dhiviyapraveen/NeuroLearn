import Task from "../models/Task.js";
import Analytics from "../models/Analytics.js";
import { recordStreakEvent, toDateKey } from "../services/streakService.js";

const dayRange = (date = new Date()) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
};

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user });
  const date = toDateKey(task.dueDate);
  await Analytics.updateOne({ user: req.user, date }, { $inc: { tasksCreated: 1 } }, { upsert: true });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const { date } = req.query;
  const filter = { user: req.user };
  if (date) {
    const { start, end } = dayRange(date);
    filter.dueDate = { $gte: start, $lt: end };
  }
  const tasks = await Task.find(filter).sort({ dueDate: 1, priority: -1 });
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const existing = await Task.findOne({ _id: req.params.id, user: req.user });
  if (!existing) return res.status(404).json({ msg: "Task not found" });

  const wasCompleted = existing.completed;
  Object.assign(existing, req.body);
  if (!wasCompleted && existing.completed) {
    existing.completedAt = new Date();
    const date = toDateKey(existing.completedAt);
    await Analytics.updateOne({ user: req.user, date }, { $inc: { tasksCompleted: 1 } }, { upsert: true });
    await recordStreakEvent(req.user, "task", existing.completedAt);
  }
  await existing.save();
  res.json(existing);
};

export const deleteTask = async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, user: req.user });
  res.json({ msg: "Task deleted" });
};

export const getTodaySummary = async (req, res) => {
  const { start, end } = dayRange();
  const tasks = await Task.find({ user: req.user, dueDate: { $gte: start, $lt: end } });
  const completed = tasks.filter((task) => task.completed).length;
  res.json({
    completed,
    pending: tasks.length - completed,
    total: tasks.length,
    completionPercentage: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
  });
};
