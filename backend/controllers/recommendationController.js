import AIEvaluation from "../models/AIEvaluation.js";
import Answer from "../models/Answer.js";
import LearningJournal from "../models/LearningJournal.js";
import { weeklySummaryPrompt } from "../prompts/aiPrompts.js";
import { generateWeeklySummaryWithAI } from "../services/openaiService.js";

export const getRecommendations = async (req, res) => {
  const [evaluations, answers, journals] = await Promise.all([
    AIEvaluation.find({ user: req.user }).sort({ createdAt: -1 }).limit(10),
    Answer.find({ user: req.user, marks: { $lt: 7 } }).populate("question").sort({ createdAt: -1 }).limit(10),
    LearningJournal.find({ user: req.user }).sort({ entryDate: -1 }).limit(7),
  ]);

  const weakTopics = [
    ...evaluations.flatMap((item) => item.improvementAreas || []),
    ...answers.map((item) => item.question?.concept).filter(Boolean),
  ].slice(0, 6);

  const summary = await generateWeeklySummaryWithAI(weeklySummaryPrompt({
    journals: journals.map((journal) => journal.content).join("\n"),
    scores: evaluations.map((item) => item.score).join(", "),
    weakTopics: weakTopics.join(", "),
  }));

  res.json({
    weakTopics,
    reviseTopics: weakTopics.length ? weakTopics : ["Revise your lowest-scoring journal topic"],
    tomorrowGoals: summary.tomorrowGoals,
    recommendedStudyMinutes: summary.recommendedStudyMinutes,
    weeklySummary: summary,
  });
};
