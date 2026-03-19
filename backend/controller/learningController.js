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