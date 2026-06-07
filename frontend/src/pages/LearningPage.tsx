import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code,
  Lightbulb,
  ListChecks,
  Sparkles,
  TimerReset,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { useBehaviorTracking } from '@/hooks/useBehaviorTracking';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { learningApi } from '@/lib/api';

export const lessons = [
  {
    id: 1,
    title: 'Core Concept',
    progressKey: 'Core Concept',
    level: 'basic' as const,
    outcome: 'Learn the main idea with content that can become simpler or harder based on engagement.',
    content: `Purpose\nThis screen demonstrates the main feature of the project: personalized study content. The learner is not given the same static material every time. Their behavior and progress decide what support appears next.\n\nStudy Content\nKnowledge retention improves when learners first understand the core idea, then recall it without help, then revisit it after time has passed.\n\nCore Idea\nAdaptive learning means the platform observes how a learner is working and changes the experience. If the learner is focused, the platform can give a challenge. If the learner appears confused, it can simplify the explanation. If the learner is idle or distracted, it can give a short reset or recall task.\n\nHow This App Uses It\n1. Tracks behavior while the learner reads and types.\n2. Detects cognitive state from behavior signals.\n3. Shows a personalized hint, simplified explanation, quiz, or challenge.\n4. Updates progress after a retention check.\n\nMini Task\nWrite one sentence explaining why adaptive content is better than the same lesson for every learner.`,
    simplified: 'The platform watches learning behavior and changes the content so the learner gets the right help at the right time.',
    retrieval: 'What are the four main steps of this adaptive learning flow?',
    challenge: 'Explain how the app should react when a learner is focused versus confused.',
    misconception: 'Personalized learning is not just showing easier content. It can also give challenges, recall tasks, and review.',
    quiz: [
      { question: 'What does adaptive learning change?', options: ['Content and support', 'Only the logo', 'Only the password'], answer: 'Content and support' },
      { question: 'What should happen when a learner is confused?', options: ['Simplify or give a hint', 'Hide the lesson', 'Ignore behavior'], answer: 'Simplify or give a hint' },
      { question: 'What should happen when a learner is focused?', options: ['Give a challenge', 'Stop tracking progress', 'Repeat login'], answer: 'Give a challenge' },
      { question: 'Which action helps retention?', options: ['Recall and review', 'Skipping feedback', 'Random navigation'], answer: 'Recall and review' },
      { question: 'What makes the platform different from static lessons?', options: ['It reacts to learner signals', 'It uses fixed text only', 'It has no progress'], answer: 'It reacts to learner signals' },
    ],
  },
  {
    id: 2,
    title: 'Practice Skill',
    progressKey: 'Practice Skill',
    level: 'intermediate' as const,
    outcome: 'Practice the concept while the app monitors behavior and adjusts support.',
    content: `Purpose\nThis module demonstrates behavior tracking. While the learner types, moves the mouse, pauses, or deletes text, the platform converts those actions into useful engagement signals.\n\nTracked Behavior\nTyping speed can suggest flow or hesitation.\nBackspace count can suggest uncertainty.\nIdle time can suggest distraction or overload.\nMouse movement can suggest activity level.\n\nWhy It Matters\nA normal education website only checks final answers. This platform also studies the learning process. That makes it possible to support the learner before they fail a quiz.\n\nPersonalized Response\nFocused learner: show a harder practice task.\nConfused learner: show simpler wording and a hint.\nDistracted learner: give a short recall task to regain attention.\n\nMini Task\nType a short answer in the response box. Pause, edit, or continue typing and watch the live behavior metrics change.`,
    simplified: 'The app tracks how the learner studies, not only whether the final answer is correct.',
    retrieval: 'Name two behavior signals tracked by this platform.',
    challenge: 'Describe one way behavior tracking can help a struggling learner earlier.',
    misconception: 'Behavior tracking is not for judging the learner. It is used to choose better support.',
    quiz: [
      { question: 'Which behavior is tracked?', options: ['Typing speed', 'Shoe size', 'Battery brand'], answer: 'Typing speed' },
      { question: 'High backspace count may suggest?', options: ['Uncertainty', 'Perfect mastery', 'No activity'], answer: 'Uncertainty' },
      { question: 'Idle time can suggest?', options: ['Distraction or overload', 'Completed mastery always', 'New account created'], answer: 'Distraction or overload' },
      { question: 'Why track behavior?', options: ['To adapt support early', 'To remove quizzes', 'To make content random'], answer: 'To adapt support early' },
      { question: 'A confused learner should receive?', options: ['Simpler support', 'A harder task immediately', 'No feedback'], answer: 'Simpler support' },
    ],
  },
  {
    id: 3,
    title: 'Retention Review',
    progressKey: 'Retention Review',
    level: 'advanced' as const,
    outcome: 'Use quizzes and review decisions to improve knowledge retention over time.',
    content: `Purpose\nThis module demonstrates retention optimization. The platform should not only help the learner finish one lesson. It should help them remember the concept later.\n\nRetention Strategy\nActive recall: ask the learner to remember before showing the answer.\nMastery tracking: update progress after each quiz.\nWeak area detection: identify topics below the target score.\nReview priority: send the learner back to topics most likely to be forgotten.\n\nProgress Logic\nIf quiz performance is strong, the learner can move to a challenge.\nIf performance is partial, the learner gets retrieval practice.\nIf performance is low, the learner receives simplified review content.\n\nMini Task\nTake the quiz and return to the dashboard. The progress bars and latest evidence will update from your result.`,
    simplified: 'Retention improves when the app tests recall, tracks weak areas, and sends the learner back to review at the right time.',
    retrieval: 'Why is active recall better than only rereading?',
    challenge: 'Suggest one rule for deciding when a learner should review a topic again.',
    misconception: 'Progress is not just lesson completion. Real progress means the learner can remember and apply the idea later.',
    quiz: [
      { question: 'What does retention mean?', options: ['Remembering later', 'Opening the app once', 'Changing colors'], answer: 'Remembering later' },
      { question: 'What updates progress in this app?', options: ['Quiz evidence', 'Only scrolling', 'Only login'], answer: 'Quiz evidence' },
      { question: 'Low quiz score should trigger?', options: ['Review content', 'Ignore the learner', 'Delete progress'], answer: 'Review content' },
      { question: 'Active recall asks learners to?', options: ['Remember before seeing answers', 'Only reread silently', 'Skip practice'], answer: 'Remember before seeing answers' },
      { question: 'The platform optimizes?', options: ['Retention and progress', 'Decoration only', 'Random lessons'], answer: 'Retention and progress' },
    ],
  },
];

export default function LearningPage() {
  const navigate = useNavigate();
  const { trackingData, cognitiveState } = useBehaviorTracking();
  const [activeLesson, setActiveLesson] = useState(0);
  const [code, setCode] = useState('Write your study response here.\n\nExample: This platform improves retention because it tracks behavior, detects engagement, and changes content based on learner needs.');
  const [showMessage, setShowMessage] = useState('');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const lesson = lessons[activeLesson];

  const getStateColor = () => {
    switch (cognitiveState.state) {
      case 'focused':
        return 'text-emerald-400 border-emerald-400/40 bg-emerald-500/10';
      case 'confused':
        return 'text-amber-300 border-amber-300/40 bg-amber-500/10';
      case 'distracted':
        return 'text-rose-400 border-rose-400/40 bg-rose-500/10';
      default:
        return 'text-sky-400 border-sky-400/40 bg-sky-500/10';
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Take a Quiz':
        navigate(`/learn/quiz/${lessons[activeLesson].id}`);
        break;
      case 'Get Hint':
        setShowMessage(`Hint: ${lesson.misconception}`);
        break;
      case 'Simplify Content':
        setShowMessage(`Simplified summary: ${lesson.simplified}`);
        break;
      case 'Next Challenge':
        setShowMessage(lesson.challenge);
        break;
      default:
        break;
    }
  };

  const handleSubmitCode = async () => {
    try {
      const response = await learningApi.analyzeCode(code, lesson.id);
      const hint = response.data.hint || 'Code submitted. Keep practicing!';
      setShowMessage(hint);
      toast.success('Response analysis received.');
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Could not analyze code. Try again.';
      toast.error(message);
    }
  };

  const toggleTask = (task: string) => {
    const key = `${lesson.id}-${task}`;
    setCompletedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const taskList = [
    { label: 'Study the content', detail: lesson.outcome },
    { label: 'Answer retrieval prompt', detail: lesson.retrieval },
    { label: 'Complete adaptive task', detail: lesson.challenge },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col gap-6 xl:h-[calc(100vh-5rem)] xl:flex-row max-w-[1600px] mx-auto">
      <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-auto pr-2">
        <div className="flex gap-2 shrink-0 overflow-x-auto pb-1">
          {lessons.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setActiveLesson(i)}
              className={`flex min-w-fit items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                i === activeLesson
                  ? 'bg-primary/15 text-primary neon-border'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              {l.title}
            </button>
          ))}
        </div>

        <GlassCard className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3 mb-5">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getStateColor()}`}>
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{lesson.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{lesson.outcome}</p>
                </div>
              </div>
              <div className="prose prose-invert max-w-none text-sm leading-relaxed text-foreground/90 whitespace-pre-line prose-headings:text-foreground">
                {lesson.content}
              </div>
            </motion.div>
          </AnimatePresence>
        </GlassCard>

        <GlassCard className="shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Learner Response Box</span>
            <span className="text-xs text-muted-foreground ml-auto">Tracking typing behavior...</span>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-h-[140px] bg-background/80 border-border font-mono text-sm resize-none focus:border-primary"
          />
          <div className="flex justify-end mt-3">
            <Button onClick={handleSubmitCode} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary">
              <Sparkles className="w-4 h-4 mr-1" /> Analyze Response
            </Button>
          </div>
        </GlassCard>
      </div>

      <div className="w-full xl:w-96 shrink-0 flex flex-col gap-4 overflow-auto">
        <GlassCard glow>
          <div className="flex items-center gap-2 mb-4">
            <Brain className={`w-5 h-5 animate-brain-pulse ${getStateColor().split(' ')[0]}`} />
            <span className="text-sm font-semibold">Cognitive Monitor</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Current State</p>
              <span className={`inline-flex px-3 py-1 rounded-full border ${getStateColor()} font-semibold text-xs`}>{cognitiveState.state.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              {[
                { label: 'WPM', value: trackingData.typingSpeed },
                { label: 'Backspace', value: trackingData.backspaceCount },
                { label: 'Mouse', value: `${trackingData.mouseSpeed}px/s` },
                { label: 'Idle', value: `${trackingData.pauseTime}s` },
              ].map((m) => (
                <div key={m.label} className="p-2 rounded-lg bg-secondary/50">
                  <p className="text-lg font-bold text-accent">{m.value}</p>
                  <p className="text-[10px] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard delay={0.1}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-warning" />
            <span className="text-sm font-semibold">Adaptive Suggestion</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${cognitiveState.state}-${cognitiveState.response.action}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
                <ChevronRight className="w-3 h-3" />
                {cognitiveState.response.action.toUpperCase()}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cognitiveState.response.content}
              </p>
            </motion.div>
          </AnimatePresence>
          {showMessage && <p className="mt-2 text-xs text-emerald-300">{showMessage}</p>}
        </GlassCard>

        <GlassCard delay={0.2}>
          <p className="text-sm font-semibold mb-3 flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-primary" />
            Lesson Evidence
          </p>
          <div className="space-y-2">
            {taskList.map((task) => {
              const key = `${lesson.id}-${task.label}`;
              const checked = completedTasks[key];
              return (
                <button
                  key={task.label}
                  onClick={() => toggleTask(task.label)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    checked ? 'border-success/40 bg-success/10' : 'border-border bg-secondary/40 hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${checked ? 'text-success' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium">{task.label}</span>
                  </div>
                  <p className="mt-1 pl-6 text-xs text-muted-foreground">{task.detail}</p>
                </button>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard delay={0.25}>
          <p className="text-sm font-semibold mb-3 flex items-center gap-2">
            <TimerReset className="h-4 w-4 text-primary" />
            Adaptive Actions
          </p>
          <div className="space-y-2">
            {['Take a Quiz', 'Get Hint', 'Simplify Content', 'Next Challenge'].map((action) => (
              <button
                key={action}
                onClick={() => handleQuickAction(action)}
                className="w-full text-left text-sm px-3 py-2.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between"
              >
                {action}
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
