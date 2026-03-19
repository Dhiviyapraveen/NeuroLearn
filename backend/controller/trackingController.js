import { saveBehavior } from "../services/trackingService.js";
import { analyzeCognitiveState } from "../services/cognitiveService.js";
import { getAdaptiveResponse } from "../services/adaptiveService.js";

export const trackBehavior = async (req, res) => {
  try {
    const userId = req.user;
    const data = req.body;

    // Save data
    await saveBehavior(userId, data);

    // Analyze
    const state = analyzeCognitiveState(data);

    // Adapt
    const response = getAdaptiveResponse(state);

    res.json({
      state,
      response,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};