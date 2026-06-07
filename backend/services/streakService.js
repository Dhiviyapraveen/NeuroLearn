import Streak from "../models/Streak.js";
import Achievement from "../models/Achievement.js";

export const toDateKey = (date = new Date()) => new Date(date).toISOString().slice(0, 10);

const yesterdayKey = (dateKey) => {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return toDateKey(date);
};

const updateCounter = (streak, kind, dateKey) => {
  const currentField = `${kind}Current`;
  const longestField = `${kind}Longest`;
  const lastField = `last${kind[0].toUpperCase()}${kind.slice(1)}Date`;
  const datesField = kind === "learning" ? "activeDates" : `${kind}Dates`;

  if (streak[lastField] === dateKey) return;
  const nextCurrent = streak[lastField] === yesterdayKey(dateKey) ? streak[currentField] + 1 : 1;
  streak[currentField] = nextCurrent;
  streak[longestField] = Math.max(streak[longestField], nextCurrent);
  streak[lastField] = dateKey;
  if (!streak[datesField].includes(dateKey)) streak[datesField].push(dateKey);
};

export const recordStreakEvent = async (userId, eventType, date = new Date()) => {
  const dateKey = toDateKey(date);
  const streak = await Streak.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId } },
    { upsert: true, new: true },
  );

  updateCounter(streak, "learning", dateKey);
  if (eventType === "task") updateCounter(streak, "task", dateKey);
  if (eventType === "journal") updateCounter(streak, "journal", dateKey);
  await streak.save();
  await awardAchievements(userId, streak);
  return streak;
};

export const awardAchievements = async (userId, streak) => {
  const achievements = [
    { threshold: 3, code: "bronze-learner", title: "Bronze Learner", level: "bronze" },
    { threshold: 7, code: "silver-learner", title: "Silver Learner", level: "silver" },
    { threshold: 14, code: "gold-learner", title: "Gold Learner", level: "gold" },
    { threshold: 30, code: "consistency-champion", title: "Consistency Champion", level: "champion" },
  ];

  await Promise.all(achievements
    .filter((item) => streak.learningLongest >= item.threshold)
    .map((item) => Achievement.updateOne(
      { user: userId, code: item.code },
      {
        $setOnInsert: {
          user: userId,
          code: item.code,
          title: item.title,
          level: item.level,
          description: `Maintained a ${item.threshold}+ day learning streak.`,
        },
      },
      { upsert: true },
    )));
};
