export const analyzeCognitiveState = (data) => {
  const { typingSpeed, backspaceCount, pauseTime, mouseSpeed } = data;

  if (pauseTime > 10 || backspaceCount > 15) {
    return "distracted";
  }

  if (typingSpeed > 35 && backspaceCount < 5 && mouseSpeed > 10) {
    return "focused";
  }

  return "confused";
};