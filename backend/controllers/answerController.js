import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import Analytics from "../models/Analytics.js";
import { answerEvaluationPrompt } from "../prompts/aiPrompts.js";
import { evaluateAnswerWithAI } from "../services/openaiService.js";
import { toDateKey } from "../services/streakService.js";

export const submitAnswer = async (req, res) => {
  const question = await Question.findOne({ _id: req.params.questionId, user: req.user });
  if (!question) return res.status(404).json({ msg: "Question not found" });

  const evaluation = await evaluateAnswerWithAI(
    req.body.answer,
    answerEvaluationPrompt({
      question: question.question,
      expectedAnswer: question.expectedAnswer,
      answer: req.body.answer,
    }),
  );

  const answer = await Answer.create({
    user: req.user,
    question: question._id,
    answer: req.body.answer,
    marks: evaluation.marks,
    corrections: evaluation.corrections,
    mistakeExplanation: evaluation.mistakeExplanation,
    feedback: evaluation.feedback,
    rawResponse: evaluation,
  });

  await Analytics.updateOne(
    { user: req.user, date: toDateKey() },
    { $set: { answerScore: evaluation.marks } },
    { upsert: true },
  );

  res.status(201).json(answer);
};

export const getAnswers = async (req, res) => {
  const answers = await Answer.find({ user: req.user }).populate("question").sort({ createdAt: -1 });
  res.json(answers);
};
