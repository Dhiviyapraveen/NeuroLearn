import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Brain, Zap, Clock, TrendingUp, BookOpen, Target, Activity } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { CognitiveStateBadge } from '@/components/CognitiveStateBadge';
import { Progress } from '@/components/ui/progress';
import { useBehaviorTracking } from '@/hooks/useBehaviorTracking';
import { useNavigate } from 'react-router-dom';

interface Props {
  userName: string;
}

export default function Dashboard({ userName }: Props) {
  const { trackingData, cognitiveState } = useBehaviorTracking();
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState([
    { name: 'Neural Networks', pct: 75 },
    { name: 'Machine Learning', pct: 45 },
    { name: 'Deep Learning', pct: 20 },
  ]);

  useEffect(() => {
    const progressStored = localStorage.getItem('learningProgress');
    if (progressStored) {
      const parsed = JSON.parse(progressStored);
      setProgressData([
        { name: 'Neural Networks', pct: parsed['Neural Networks'] ?? 75 },
        { name: 'Machine Learning', pct: parsed['Machine Learning'] ?? 45 },
        { name: 'Deep Learning', pct: parsed['Deep Learning'] ?? 20 },
      ]);
    }
  }, []);

  const stats = [
    { label: 'Typing Speed', value: `${trackingData.typingSpeed} WPM`, icon: Zap, color: 'text-accent' },
    { label: 'Focus Time', value: '2h 34m', icon: Clock, color: 'text-success' },
    { label: 'Lessons Done', value: '12', icon: BookOpen, color: 'text-neon-purple' },
    { label: 'Accuracy', value: '94%', icon: Target, color: 'text-neon-pink' },
  ];

  const recentActivity = [
    { title: 'Completed: Intro to Neural Networks', time: '2h ago', type: 'complete' },
    { title: 'Quiz: Machine Learning Basics', time: '4h ago', type: 'quiz' },
    { title: 'Started: Deep Learning Fundamentals', time: '1d ago', type: 'start' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-gradient">{userName}</span>
        </h1>
        <p className="text-muted-foreground mt-1">Here's your learning overview</p>
      </motion.div>

      {/* Cognitive State */}
      <GlassCard glow delay={0.1}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-accent animate-brain-pulse" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Cognitive State</p>
              <CognitiveStateBadge state={cognitiveState.state} />
            </div>
          </div>
          <div className="text-sm text-muted-foreground max-w-sm">
            <Activity className="w-4 h-4 inline mr-1" />
            {cognitiveState.response.content}
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <GlassCard key={stat.label} delay={0.15 + i * 0.05}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Progress & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard delay={0.3}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Learning Progress
          </h3>
          <div className="space-y-4">
            {progressData.map((course) => (
              <div key={course.name} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>{course.name}</span>
                  <span className="text-muted-foreground">{course.pct}%</span>
                </div>
                <Progress value={course.pct} className="h-2 bg-secondary" />
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/learn')}
            className="mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Continue Learning →
          </button>
        </GlassCard>

        <GlassCard delay={0.35}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <span className="text-sm">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
