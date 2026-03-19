import BehaviorLog from "../models/BehaviorLog.js";

export const saveBehavior = async (userId, data) => {
  return await BehaviorLog.create({
    userId,
    ...data,
  });
};