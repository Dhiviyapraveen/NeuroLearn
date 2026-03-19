import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  const submitQuiz = () => {
    const correct = lesson.quiz.reduce((acc, q, idx) => acc + (answers[idx] === q.answer ? 1 : 0), 0);
    setScore(correct);

    const percentCorrect = (correct / lesson.quiz.length) * 100;
    const existing = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    const mapping: Record<number, string> = {
      1: 'Neural Networks',
      2: 'Machine Learning',
      3: 'Deep Learning',
    };
    const lessonName = mapping[lesson.id] || lesson.title;
    const updated = {
      'Neural Networks': 75,
      'Machine Learning': 45,
      'Deep Learning': 20,
      ...existing,
    };

    if (lesson.id === 1 && correct > 7) {
      updated[lessonName] = 100;
    } else if (percentCorrect >= 70) {
      updated[lessonName] = Math.max(updated[lessonName] || 0, 75);
    }

    localStorage.setItem('learningProgress', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Quiz: {lesson.title}</h1>
            <p className="text-sm text-muted-foreground">Answer the questions below to test your understanding.</p>
          </div>
          <Button onClick={() => navigate('/learn')}>Back to Learn</Button>
        </div>

        <GlassCard>
          <div className="space-y-4">
            {lesson.quiz.map((q, idx) => (
              <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                <p className="mb-2 text-sm font-semibold">{idx + 1}. {q.question}</p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswers((prev) => ({ ...prev, [idx]: opt }))}
                      className={`rounded-md px-3 py-1.5 text-xs border ${answers[idx] === opt ? 'border-primary bg-primary/20' : 'border-slate-600'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Button onClick={submitQuiz}>Submit Quiz</Button>
              {score !== null && <p className="text-sm">Score: {score}/{lesson.quiz.length}</p>}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
