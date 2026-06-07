import LearningJournal from "../models/LearningJournal.js";
import AIEvaluation from "../models/AIEvaluation.js";
import Question from "../models/Question.js";
import Analytics from "../models/Analytics.js";
import { evaluationPrompt, questionPrompt } from "../prompts/aiPrompts.js";
import { evaluateJournalWithAI, generateQuestionsWithAI } from "../services/openaiService.js";
import { recordStreakEvent, toDateKey } from "../services/streakService.js";

export const createJournal = async (req, res) => {
  const journal = await LearningJournal.create({ ...req.body, user: req.user });
  const evaluationData = await evaluateJournalWithAI(journal.content, evaluationPrompt(journal.content));

  const evaluation = await AIEvaluation.create({
    user: req.user,
    journal: journal._id,
    score: evaluationData.score,
    concepts: evaluationData.concepts || [],
    feedback: evaluationData.feedback,
    improvementAreas: evaluationData.improvementAreas || [],
    understandingType: evaluationData.understandingType || "mixed",
    rawResponse: evaluationData,
  });

  const questionData = await generateQuestionsWithAI(
    journal.content,
    evaluation.concepts,
    questionPrompt({ journalText: journal.content, concepts: evaluation.concepts }),
  );

  const questions = await Question.insertMany((questionData.questions || []).map((item) => ({
    ...item,
    user: req.user,
    journal: journal._id,
    evaluation: evaluation._id,
  })));

  const date = toDateKey(journal.entryDate);
  await Analytics.updateOne(
    { user: req.user, date },
    {
      $inc: { learningMinutes: journal.studyMinutes || 0 },
      $set: { journalSubmitted: true, averageEvaluationScore: evaluation.score },
    },
    { upsert: true },
  );
  await recordStreakEvent(req.user, "journal", journal.entryDate);

  res.status(201).json({ journal, evaluation, questions });
};

export const getJournals = async (req, res) => {
  const journals = await LearningJournal.find({ user: req.user }).sort({ entryDate: -1 });
  res.json(journals);
};

export const getJournalDetail = async (req, res) => {
  const journal = await LearningJournal.findOne({ _id: req.params.id, user: req.user });
  if (!journal) return res.status(404).json({ msg: "Journal not found" });
  const evaluation = await AIEvaluation.findOne({ journal: journal._id, user: req.user });
  const questions = await Question.find({ journal: journal._id, user: req.user });
  res.json({ journal, evaluation, questions });
};
