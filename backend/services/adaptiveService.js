export const getAdaptiveResponse = (state) => {
  switch (state) {
    case "confused":
      return { action: "simplify", content: "basic_explanation" };

    case "focused":
      return { action: "challenge", content: "advanced_problem" };

    case "distracted":
      return { action: "engage", content: "interactive_quiz" };

    case "struggling":
      return { action: "assist", content: "step_by_step_help" };

    default:
      return { action: "continue", content: "normal_flow" };
  }
};