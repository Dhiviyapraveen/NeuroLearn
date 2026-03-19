export const analyzeCognitiveState = (data) => {
  const { typingSpeed, backspaceCount, pauseTime, mouseSpeed } = data;

  if (pauseTime > 6000 && typingSpeed < 20) {
    return "confused";
  }

  if (typingSpeed > 50 && backspaceCount < 2 && mouseSpeed > 30) {
    return "focused";
  }

  if (pauseTime > 8000) {
    return "distracted";
  }

  if (backspaceCount > 10) {
    return "struggling";
  }

  return "neutral";
};