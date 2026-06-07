const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

const parseJson = (text, fallback) => {
  try {
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    return fallback;
  }
};

const localEvaluation = (journalText) => {
  const words = journalText.trim().split(/\s+/).filter(Boolean);
  const concepts = Array.from(new Set((journalText.match(/[A-Z]?[a-zA-Z]{5,}/g) || []).slice(0, 6)));
  const hasExample = /example|implemented|used|built|solved|practiced/i.test(journalText);
  const score = Math.min(10, Math.max(4, Math.round(words.length / 12) + (hasExample ? 2 : 0)));

  return {
    score,
    concepts: concepts.length ? concepts : ["Learning reflection"],
    feedback: hasExample
      ? "Good reflection with signs of applied learning. Add one concrete result or mistake for stronger accountability."
      : "The reflection captures what was studied. Add examples, practice outcomes, and what felt difficult to show deeper understanding.",
    improvementAreas: ["Add practical examples", "Mention mistakes or doubts", "Connect concepts to a use case"],
    understandingType: hasExample ? "conceptual" : "mixed",
  };
};

const localQuestions = (journalText, concepts = []) => {
  const topic = concepts[0] || journalText.split(/\s+/).slice(0, 3).join(" ") || "today's topic";
  return {
    questions: [
      { difficulty: "easy", question: `What did you learn about ${topic}?`, expectedAnswer: "A clear definition or summary.", concept: topic },
      { difficulty: "easy", question: `Name one key term related to ${topic}.`, expectedAnswer: "A relevant concept from the journal.", concept: topic },
      { difficulty: "easy", question: `Why is ${topic} important?`, expectedAnswer: "A short explanation of usefulness.", concept: topic },
      { difficulty: "medium", question: `Explain ${topic} with an example.`, expectedAnswer: "Concept plus practical example.", concept: topic },
      { difficulty: "medium", question: `What mistake might a beginner make with ${topic}?`, expectedAnswer: "A misconception and correction.", concept: topic },
      { difficulty: "hard", question: `Apply ${topic} to solve a real learning or coding problem.`, expectedAnswer: "Applied reasoning with steps.", concept: topic },
    ],
  };
};

const localAnswerEvaluation = (answer) => {
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const marks = Math.min(10, Math.max(2, Math.round(words.length / 8)));
  return {
    marks,
    corrections: "Add a definition, example, and why it matters.",
    mistakeExplanation: words.length < 20 ? "The answer is too short to prove understanding." : "The answer is reasonable but can be more specific.",
    feedback: "Good attempt. Strengthen it with a concrete example and clearer terminology.",
  };
};

export const runOpenAIJson = async (prompt, fallback) => {
  if (!process.env.OPENAI_API_KEY) return fallback;

  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "Return only valid JSON. Do not include markdown." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) return fallback;
  const data = await response.json();
  return parseJson(data.choices?.[0]?.message?.content || "", fallback);
};

export const evaluateJournalWithAI = (journalText, prompt) =>
  runOpenAIJson(prompt, localEvaluation(journalText));

export const generateQuestionsWithAI = (journalText, concepts, prompt) =>
  runOpenAIJson(prompt, localQuestions(journalText, concepts));

export const evaluateAnswerWithAI = (answer, prompt) =>
  runOpenAIJson(prompt, localAnswerEvaluation(answer));

export const generateWeeklySummaryWithAI = (prompt) =>
  runOpenAIJson(prompt, {
    summary: "You stayed consistent this week. Keep combining daily goals with reflection and recall questions.",
    wins: ["Submitted learning reflections", "Tracked progress"],
    weakTopics: ["Review missed concepts from answer evaluations"],
    tomorrowGoals: ["Revise one weak topic", "Complete two focused tasks", "Write one reflection with examples"],
    recommendedStudyMinutes: 90,
  });
