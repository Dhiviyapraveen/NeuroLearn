export const getLearningContent = (req, res) => {
  const { level } = req.query;

  const contentMap = {
    basic: {
      title: "Core Concept",
      objective: "Understand how adaptive learning changes content from behavior and progress.",
      activity: "Explain why personalized content is better than one static lesson.",
    },
    intermediate: {
      title: "Practice Skill",
      objective: "Use behavior signals like typing, backspaces, idle time, and mouse movement.",
      activity: "Describe how behavior tracking can support a learner before quiz failure.",
    },
    advanced: {
      title: "Retention Review",
      objective: "Optimize knowledge retention with recall checks, mastery progress, and review priority.",
      activity: "Complete a retention check and update the learner progress state.",
    },
  };

  res.json({
    content: contentMap[level] || contentMap.basic,
  });
};

export const analyzeCode = (req, res) => {
  const { code, lessonId } = req.body;
  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    return res.status(400).json({ message: 'Please enter your code in the editor before submitting.' });
  }

  const normalizedCode = code.toLowerCase();
  let score = 0;
  if (normalizedCode.length > 60) score += 1;
  if (normalizedCode.includes('learner') || normalizedCode.includes('student')) score += 1;
  if (normalizedCode.includes('progress') || normalizedCode.includes('content') || normalizedCode.includes('support')) score += 1;

  let hint = 'Nice start. Add one clear example of how the platform adapts to the learner.';
  if (lessonId === 1 && (normalizedCode.includes('adaptive') || normalizedCode.includes('personal'))) {
    score += 1;
    hint = 'Good explanation. Add how the content changes when the learner is confused or focused.';
  }
  if (lessonId === 2 && (normalizedCode.includes('behavior') || normalizedCode.includes('typing') || normalizedCode.includes('idle'))) {
    score += 1;
    hint = 'Good behavior-tracking point. Connect the signal to a specific support action.';
  }
  if (lessonId === 3 && (normalizedCode.includes('retention') || normalizedCode.includes('review') || normalizedCode.includes('recall'))) {
    score += 1;
    hint = 'Strong retention answer. Add how quiz evidence updates progress or review priority.';
  }

  if (score >= 3) {
    hint = 'Great response. It clearly connects behavior, personalization, engagement, and retention.';
  }

  return res.json({
    hint,
    progress: Math.min(1, score / 5),
    lessonId,
  });
};
