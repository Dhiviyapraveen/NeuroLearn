export const getAdaptiveResponse = (state) => {
  switch (state) {
    case "confused":
      return { action: "simplify", content: "Review the last concept with an example." };

    case "focused":
      return { action: "challenge", content: "Try a harder question to deepen understanding." };

    case "distracted":
      return { action: "engage", content: "Take a short active recall task to regain focus." };

    default:
      return { action: "assist", content: "Keep going—you’re doing well." };
  }
};