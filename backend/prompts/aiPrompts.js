export const evaluationPrompt = (journalText) => `
You are NeuroLearn's learning evaluator. Evaluate this student's daily learning reflection.

Return strict JSON with:
{
  "score": number from 0 to 10,
  "concepts": string[],
  "feedback": string,
  "improvementAreas": string[],
  "understandingType": "conceptual" | "mixed" | "memorization"
}

Judge whether the reflection demonstrates understanding, application, examples, and clarity.

Reflection:
${journalText}
`;

export const questionPrompt = ({ journalText, concepts }) => `
Generate accountability questions from this student's learning journal.

Return strict JSON:
{
  "questions": [
    { "difficulty": "easy", "question": "...", "expectedAnswer": "...", "concept": "..." }
  ]
}

Rules:
- Exactly 3 easy, 2 medium, and 1 hard question.
- Questions must be based on the concepts and reflection.
- Keep questions short and useful for self-testing.

Concepts: ${(concepts || []).join(", ")}
Reflection:
${journalText}
`;

export const answerEvaluationPrompt = ({ question, expectedAnswer, answer }) => `
Evaluate the student's answer.

Return strict JSON:
{
  "marks": number from 0 to 10,
  "corrections": string,
  "mistakeExplanation": string,
  "feedback": string
}

Question: ${question}
Expected answer: ${expectedAnswer || "Not provided"}
Student answer: ${answer}
`;

export const weeklySummaryPrompt = ({ journals, scores, weakTopics }) => `
Create a weekly learning summary for a student.

Return strict JSON:
{
  "summary": string,
  "wins": string[],
  "weakTopics": string[],
  "tomorrowGoals": string[],
  "recommendedStudyMinutes": number
}

Journal highlights:
${journals}

Evaluation scores: ${scores}
Weak topics: ${weakTopics}
`;
