export const analyzeCognitiveState = (data) => {
  const { typingSpeed, backspaceCount, pauseTime, mouseSpeed } = data;

  if (pauseTime > 18 || (mouseSpeed > 800 && typingSpeed < 10)) {
    return "distracted";
  }

  if (backspaceCount > 12 || (typingSpeed > 0 && typingSpeed < 18)) {
    return "confused";
  }

  if (typingSpeed > 35 && backspaceCount < 6 && pauseTime < 8) {
    return "focused";
  }

  return "focused";
};
