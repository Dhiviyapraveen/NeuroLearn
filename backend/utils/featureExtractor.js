export const extractFeatures = (rawData) => {
  return {
    typingSpeed: rawData.keystrokes / rawData.time,
    backspaceCount: rawData.backspaceCount,
    mouseSpeed: rawData.mouseDistance / rawData.time,
    pauseTime: rawData.pauseTime,
  };
};