export const getAdaptiveResponse = (state) => {
  switch (state) {
    case "confused":
      return { action: "simplify", content: "Switch to a worked example, then ask for one active-recall answer." };

    case "focused":
      return { action: "challenge", content: "Focus is strong. Offer a transfer challenge instead of more reading." };

    case "distracted":
      return { action: "engage", content: "Use a 90-second reset task before continuing the lesson." };

    default:
      return { action: "assist", content: "Keep the learner in flow with a short checkpoint." };
  }
};
