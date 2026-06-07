import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { lessons } from './LearningPage';

export default function QuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = useMemo(() => lessons.find((l) => String(l.id) === lessonId), [lessonId]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <GlassCard className="max-w-xl w-full">
          <p className="text-xl font-semibold">Lesson not found</p>
          <p className="mt-2 text-sm text-muted-foreground">Please go back to the learning page.</p>
          <Button className="mt-4" onClick={() => navigate('/learn')}>Back to Learn</Button>
        </GlassCard>
      </div>
    );
  }

  const percent = score === null ? null : Math.round((score / lesson.quiz.length) * 100);

  const submitQuiz = () => {
    const correct = lesson.quiz.reduce((acc, q, idx) => acc + (answers[idx] === q.answer ? 1 : 0), 0);
    setScore(correct);

    const percentCorrect = (correct / lesson.quiz.length) * 100;
    const existing = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    const mapping: Record<number, string> = {
      1: 'Core Concept',
      2: 'Practice Skill',
      3: 'Retention Review',
    };
    const lessonName = mapping[lesson.id] || lesson.title;
    const updated = {
      'Core Concept': 72,
      'Practice Skill': 46,
      'Retention Review': 28,
      ...existing,
    };

    updated[lessonName] = Math.max(updated[lessonName] || 0, Math.round(percentCorrect));

    localStorage.setItem('learningProgress', JSON.stringify(updated));
    localStorage.setItem(
      'latestQuizResult',
      JSON.stringify({
        lessonTitle: lesson.title,
        score: correct,
        total: lesson.quiz.length,
        percent: Math.round(percentCorrect),
      }),
    );
  };

  const resetQuiz = () => {
    setAnswers({});
    setScore(null);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Quiz: {lesson.title}</h1>
            <p className="text-sm text-muted-foreground">This retention check updates progress and review priority.</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/learn')}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <GlassCard>
          <div className="space-y-4">
            {lesson.quiz.map((q, idx) => (
              <div key={idx} className="bg-secondary/50 p-4 rounded-lg border border-border">
                <p className="mb-2 text-sm font-semibold">{idx + 1}. {q.question}</p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswers((prev) => ({ ...prev, [idx]: opt }))}
                      className={`rounded-md px-3 py-1.5 text-xs border transition-colors ${
                        answers[idx] === opt ? 'border-primary bg-primary/20 text-primary' : 'border-border hover:bg-secondary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {score !== null && (
                  <div className="mt-3 flex items-start gap-2 text-xs">
                    {answers[idx] === q.answer ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <p className="text-muted-foreground">
                      Correct answer: <span className="text-foreground">{q.answer}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={submitQuiz} disabled={Object.keys(answers).length < lesson.quiz.length}>
                Submit Quiz
              </Button>
              <Button variant="secondary" onClick={resetQuiz}>
                <RotateCcw className="h-4 w-4" />
                Retry
              </Button>
              {score !== null && (
                <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm">
                  Score: <span className="font-semibold">{score}/{lesson.quiz.length}</span> ({percent}%)
                </div>
              )}
            </div>
            {score !== null && (
              <div className="rounded-lg border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                {percent >= 80
                  ? `Strong evidence of mastery. Return to ${lesson.title} and try the challenge task.`
                  : percent >= 60
                    ? `Partial mastery detected. Use active recall before moving on: ${lesson.retrieval}`
                    : `Remediation recommended. Review the simplified explanation first: ${lesson.simplified}`}
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
