import { useEffect, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GlassCard } from '@/components/GlassCard';
import { analyticsApi } from '@/lib/api';

const demoTrend = [
  { date: 'Mon', learningMinutes: 80, tasksCompleted: 2, averageEvaluationScore: 6.5, answerScore: 6 },
  { date: 'Tue', learningMinutes: 110, tasksCompleted: 3, averageEvaluationScore: 7, answerScore: 7 },
  { date: 'Wed', learningMinutes: 60, tasksCompleted: 1, averageEvaluationScore: 6.8, answerScore: 6 },
  { date: 'Thu', learningMinutes: 140, tasksCompleted: 4, averageEvaluationScore: 8.2, answerScore: 8 },
  { date: 'Fri', learningMinutes: 95, tasksCompleted: 3, averageEvaluationScore: 8.5, answerScore: 8 },
  { date: 'Sat', learningMinutes: 120, tasksCompleted: 4, averageEvaluationScore: 9, answerScore: 9 },
];

export default function AnalyticsPage() {
  const [data, setData] = useState<any>({
    summary: { learningHours: 10.1, tasksCompleted: 17, journalEntries: 6, averageEvaluationScore: 8.1, currentStreak: 5, longestStreak: 12, monthlyConsistency: 73 },
    trend: demoTrend,
    achievements: [],
  });

  useEffect(() => {
    analyticsApi.dashboard().then((res) => {
      if (res.data?.summary) setData({ ...res.data, trend: res.data.trend?.length ? res.data.trend : demoTrend });
    }).catch(() => undefined);
  }, []);

  const cards = [
    ['Learning Hours', data.summary.learningHours],
    ['Tasks Completed', data.summary.tasksCompleted],
    ['Journal Entries', data.summary.journalEntries],
    ['Avg AI Score', `${data.summary.averageEvaluationScore}/10`],
    ['Current Streak', `${data.summary.currentStreak} days`],
    ['Monthly Consistency', `${data.summary.monthlyConsistency}%`],
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Measure consistency, progress, AI scores, and knowledge improvement.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(([label, value]) => (
          <GlassCard key={label as string}><p className="text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h2 className="mb-4 font-semibold">Learning Consistency</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Area type="monotone" dataKey="learningMinutes" stroke="#8b5cf6" fill="#8b5cf655" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 font-semibold">Daily AI Score</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[0, 10]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line type="monotone" dataKey="averageEvaluationScore" stroke="#06b6d4" strokeWidth={3} />
              <Line type="monotone" dataKey="answerScore" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 font-semibold">Task Completion</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="tasksCompleted" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 font-semibold">Achievement Badges</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {['Bronze Learner', 'Silver Learner', 'Gold Learner', 'Consistency Champion'].map((badge, index) => (
              <div key={badge} className={`rounded-lg border p-4 ${index < 2 ? 'border-primary/40 bg-primary/10' : 'border-border bg-secondary/40'}`}>
                <p className="font-semibold">{badge}</p>
                <p className="text-xs text-muted-foreground">Unlocked through streak consistency.</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
