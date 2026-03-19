export const getLearningContent = (req, res) => {
  const { level } = req.query;

  const contentMap = {
    basic: "This is simple explanation",
    intermediate: "This is moderate content",
    advanced: "This is complex topic",
  };

  res.json({
    content: contentMap[level] || "Default content",
  });
};

export const analyzeCode = (req, res) => {
  const { code, lessonId } = req.body;
  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    return res.status(400).json({ message: 'Please enter your code in the editor before submitting.' });
  }

  const normalizedCode = code.toLowerCase();
  let score = 0;
  if (normalizedCode.includes('function')) score += 1;
  if (normalizedCode.includes('return')) score += 1;
  if (normalizedCode.includes('if') || normalizedCode.includes('for') || normalizedCode.includes('while')) score += 1;

  let hint = 'Nice start. Add a return step and run through one example in comments.';
  if (lessonId === 1 && normalizedCode.includes('neuron')) {
    score += 1;
    hint = 'Great neuron idea. Add activation logic and then test with sample inputs.';
  }
  if (lessonId === 2 && normalizedCode.includes('model')) {
    score += 1;
    hint = 'You are on the right track for machine learning. Try adding a training loop next.';
  }
  if (lessonId === 3 && normalizedCode.includes('layer')) {
    score += 1;
    hint = 'Good deep learning structure. Add a few stacked layers and use a simple activation.';
  }

  if (score >= 3) {
    hint = 'Great structure! Your code is promising. Keep adding a clear output example.';
  }

  return res.json({
    hint,
    progress: Math.min(1, score / 5),
    lessonId,
  });
};