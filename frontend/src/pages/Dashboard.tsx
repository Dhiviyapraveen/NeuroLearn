import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, BookOpenText, CalendarCheck, Flame, ListChecks, Medal, Sparkles, Target } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Progress } from '@/components/ui/progress';
import { analyticsApi, recommendationApi, taskApi } from '@/lib/api';

interface Props {
  userName: string;
}

export default function Dashboard({ userName }: Props) {
  const navigate = useNavigate();
  const [taskSummary, setTaskSummary] = useState({ completed: 2, pending: 3, total: 5, completionPercentage: 40 });
  const [analytics, setAnalytics] = useState<any>({
    summary: {
      learningHours: 10.1,
      journalEntries: 6,
      averageEvaluationScore: 8.1,
      currentStreak: 5,
      longestStreak: 12,
      monthlyConsistency: 73,
    },
  });
  const [recommendations, setRecommendations] = useState<any>({
    reviseTopics: ['Method overriding', 'Dynamic binding'],
    tomorrowGoals: ['Complete 3 tasks', 'Write journal with examples'],
    recommendedStudyMinutes: 90,
  });

  useEffect(() => {
    taskApi.todaySummary().then((res) => setTaskSummary(res.data)).catch(() => undefined);
    analyticsApi.dashboard().then((res) => setAnalytics(res.data)).catch(() => undefined);
    recommendationApi.list().then((res) => setRecommendations(res.data)).catch(() => undefined);
  }, []);

  const cards = [
    { label: 'Completed Today', value: taskSummary.completed, icon: ListChecks, color: 'text-success' },
    { label: 'Pending Tasks', value: taskSummary.pending, icon: Target, color: 'text-warning' },
    { label: 'Current Streak', value: `${analytics.summary.currentStreak} days`, icon: Flame, color: 'text-primary' },
    { label: 'Avg AI Score', value: `${analytics.summary.averageEvaluationScore}/10`, icon: Sparkles, color: 'text-accent' },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-gradient">{userName}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">
          NeuroLearn keeps your daily learning plan, reflection, AI feedback, streaks, and progress in one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <GlassCard key={card.label}>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary p-2"><card.icon className={`h-5 w-5 ${card.color}`} /></div>
              <div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.label}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard glow>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Today’s Completion</h2>
              <p className="text-sm text-muted-foreground">Finish planned tasks before writing your learning journal.</p>
            </div>
            <button onClick={() => navigate('/planner')} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open Planner</button>
          </div>
          <Progress className="mt-5" value={taskSummary.completionPercentage} />
          <p className="mt-2 text-sm text-muted-foreground">{taskSummary.completionPercentage}% complete</p>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-3 text-lg font-semibold">Streak & Consistency</h2>
          <div className="space-y-3">
            <p className="flex items-center justify-between text-sm"><span>Longest streak</span><span>{analytics.summary.longestStreak} days</span></p>
            <p className="flex items-center justify-between text-sm"><span>Monthly consistency</span><span>{analytics.summary.monthlyConsistency}%</span></p>
            <p className="flex items-center justify-between text-sm"><span>Journal entries</span><span>{analytics.summary.journalEntries}</span></p>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard>
          <BookOpenText className="mb-3 h-5 w-5 text-primary" />
          <h2 className="font-semibold">Reflect</h2>
          <p className="mt-2 text-sm text-muted-foreground">Submit what you learned today and receive AI evaluation, concepts, feedback, and questions.</p>
          <button onClick={() => navigate('/journal')} className="mt-4 text-sm text-primary">Open journal</button>
        </GlassCard>
        <GlassCard>
          <BarChart3 className="mb-3 h-5 w-5 text-accent" />
          <h2 className="font-semibold">Analyze</h2>
          <p className="mt-2 text-sm text-muted-foreground">Review learning hours, scores, consistency graphs, and weekly performance.</p>
          <button onClick={() => navigate('/analytics')} className="mt-4 text-sm text-primary">View analytics</button>
        </GlassCard>
        <GlassCard>
          <Medal className="mb-3 h-5 w-5 text-warning" />
          <h2 className="font-semibold">Improve</h2>
          <p className="mt-2 text-sm text-muted-foreground">Revise {recommendations.reviseTopics?.[0] || 'weak topics'} and study {recommendations.recommendedStudyMinutes} minutes tomorrow.</p>
          <button onClick={() => navigate('/recommendations')} className="mt-4 text-sm text-primary">See recommendations</button>
        </GlassCard>
      </div>

      <GlassCard>
        <h2 className="mb-4 flex items-center gap-2 font-semibold"><CalendarCheck className="h-4 w-4 text-primary" /> Tomorrow’s AI Goals</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {(recommendations.tomorrowGoals || []).slice(0, 3).map((goal: string) => (
            <div key={goal} className="rounded-lg border border-border bg-secondary/40 p-3 text-sm">{goal}</div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
