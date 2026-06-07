import { useEffect, useState } from 'react';
import { Clock, Lightbulb, RefreshCcw, Target } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { recommendationApi } from '@/lib/api';

export default function RecommendationsPage() {
  const [data, setData] = useState<any>({
    weakTopics: ['Dynamic binding', 'Overriding vs overloading'],
    reviseTopics: ['Java OOP examples', 'Runtime polymorphism'],
    tomorrowGoals: ['Revise one weak topic', 'Complete 3 planner tasks', 'Write a journal with examples'],
    recommendedStudyMinutes: 90,
    weeklySummary: { summary: 'You are building consistency. Add more examples in reflections to improve AI evaluation scores.' },
  });

  useEffect(() => {
    recommendationApi.list().then((res) => setData(res.data)).catch(() => undefined);
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Smart Recommendations</h1>
        <p className="mt-1 text-muted-foreground">AI suggestions based on weak topics, missed concepts, and previous evaluations.</p>
      </div>

      <GlassCard glow>
        <p className="text-sm text-muted-foreground">Weekly AI Summary</p>
        <p className="mt-2 text-lg">{data.weeklySummary?.summary}</p>
      </GlassCard>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard>
          <Target className="mb-3 h-5 w-5 text-primary" />
          <h2 className="font-semibold">Weak Topics</h2>
          <div className="mt-3 space-y-2">{(data.weakTopics || []).map((item: string) => <p key={item} className="rounded-md bg-secondary/50 p-2 text-sm">{item}</p>)}</div>
        </GlassCard>
        <GlassCard>
          <RefreshCcw className="mb-3 h-5 w-5 text-accent" />
          <h2 className="font-semibold">Topics to Revise</h2>
          <div className="mt-3 space-y-2">{(data.reviseTopics || []).map((item: string) => <p key={item} className="rounded-md bg-secondary/50 p-2 text-sm">{item}</p>)}</div>
        </GlassCard>
        <GlassCard>
          <Lightbulb className="mb-3 h-5 w-5 text-warning" />
          <h2 className="font-semibold">Goals for Tomorrow</h2>
          <div className="mt-3 space-y-2">{(data.tomorrowGoals || []).map((item: string) => <p key={item} className="rounded-md bg-secondary/50 p-2 text-sm">{item}</p>)}</div>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold">Recommended study duration</p>
            <p className="text-muted-foreground">{data.recommendedStudyMinutes} minutes tomorrow</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
