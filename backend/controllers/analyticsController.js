import Task from "../models/Task.js";
import LearningJournal from "../models/LearningJournal.js";
import AIEvaluation from "../models/AIEvaluation.js";
import Streak from "../models/Streak.js";
import Achievement from "../models/Achievement.js";
import Analytics from "../models/Analytics.js";

export const getAnalyticsDashboard = async (req, res) => {
  const [tasks, journals, evaluations, streak, achievements, trend] = await Promise.all([
    Task.find({ user: req.user }),
    LearningJournal.find({ user: req.user }),
    AIEvaluation.find({ user: req.user }).sort({ createdAt: 1 }),
    Streak.findOne({ user: req.user }),
    Achievement.find({ user: req.user }).sort({ awardedAt: -1 }),
    Analytics.find({ user: req.user }).sort({ date: 1 }).limit(60),
  ]);

  const completed = tasks.filter((task) => task.completed).length;
  const avgScore = evaluations.length
    ? Math.round((evaluations.reduce((sum, item) => sum + item.score, 0) / evaluations.length) * 10) / 10
    : 0;

  res.json({
    summary: {
      learningHours: Math.round((journals.reduce((sum, item) => sum + (item.studyMinutes || 0), 0) / 60) * 10) / 10,
      tasksCompleted: completed,
      tasksTotal: tasks.length,
      journalEntries: journals.length,
      averageEvaluationScore: avgScore,
      currentStreak: streak?.learningCurrent || 0,
      longestStreak: streak?.learningLongest || 0,
      monthlyConsistency: streak?.activeDates?.length ? Math.min(100, Math.round((streak.activeDates.length / 30) * 100)) : 0,
    },
    trend,
    evaluations,
    streak,
    achievements,
  });
};
