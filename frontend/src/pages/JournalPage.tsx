import { useEffect, useState } from 'react';
import { Brain, CheckCircle2, Send } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { answerApi, journalApi } from '@/lib/api';
import { toast } from 'sonner';

type Question = { _id: string; difficulty: string; question: string; expectedAnswer?: string };

export default function JournalPage() {
  const [content, setContent] = useState('Today I learned about polymorphism in Java, method overriding, and dynamic binding.');
  const [studyMinutes, setStudyMinutes] = useState(90);
  const [history, setHistory] = useState<any[]>([]);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answerResults, setAnswerResults] = useState<Record<string, any>>({});

  useEffect(() => {
    journalApi.list().then((res) => setHistory(res.data || [])).catch(() => undefined);
  }, []);

  const submitJournal = async () => {
    try {
      const res = await journalApi.create({ content, studyMinutes, tags: [] });
      setEvaluation(res.data.evaluation);
      setQuestions(res.data.questions || []);
      setHistory((prev) => [res.data.journal, ...prev]);
    } catch {
      const localEvaluation = {
        score: 8,
        concepts: ['Polymorphism', 'Method Overriding', 'Dynamic Binding'],
        feedback: 'Good understanding. Add a practical Java example to strengthen conceptual clarity.',
        improvementAreas: ['Add examples', 'Compare with overloading'],
        understandingType: 'conceptual',
      };
      setEvaluation(localEvaluation);
      setQuestions([
        { _id: 'q1', difficulty: 'easy', question: 'What is polymorphism?' },
        { _id: 'q2', difficulty: 'easy', question: 'What is method overriding?' },
        { _id: 'q3', difficulty: 'easy', question: 'What is dynamic binding?' },
        { _id: 'q4', difficulty: 'medium', question: 'Differentiate overloading and overriding.' },
        { _id: 'q5', difficulty: 'medium', question: 'Why is runtime polymorphism useful?' },
        { _id: 'q6', difficulty: 'hard', question: 'How does dynamic binding support runtime polymorphism?' },
      ]);
      toast.info('Demo AI evaluation shown. Add OPENAI_API_KEY and MongoDB to persist it.');
    }
  };

  const submitAnswer = async (question: Question) => {
    const answer = answers[question._id];
    if (!answer) return;
    try {
      const res = await answerApi.submit(question._id, answer);
      setAnswerResults((prev) => ({ ...prev, [question._id]: res.data }));
    } catch {
      setAnswerResults((prev) => ({
        ...prev,
        [question._id]: { marks: 7, feedback: 'Good attempt. Add one precise example and define key terms clearly.', corrections: 'Include definition + example + use case.' },
      }));
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Daily Learning Journal</h1>
        <p className="mt-1 text-muted-foreground">Reflect on what you learned and get AI accountability feedback.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <GlassCard>
            <p className="mb-3 text-sm font-semibold">What did you learn today?</p>
            <Textarea className="min-h-40" value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="mt-3 flex items-center gap-3">
              <Input className="w-36" type="number" value={studyMinutes} onChange={(e) => setStudyMinutes(Number(e.target.value))} />
              <span className="text-sm text-muted-foreground">study minutes</span>
              <Button className="ml-auto" onClick={submitJournal}><Brain className="h-4 w-4" /> Evaluate with AI</Button>
            </div>
          </GlassCard>

          {questions.length > 0 && (
            <GlassCard>
              <h2 className="mb-4 text-lg font-semibold">AI Generated Questions</h2>
              <div className="space-y-4">
                {questions.map((question) => (
                  <div key={question._id} className="rounded-lg border border-border bg-secondary/40 p-4">
                    <p className="text-xs uppercase text-primary">{question.difficulty}</p>
                    <p className="mt-1 text-sm font-medium">{question.question}</p>
                    <Textarea className="mt-3 min-h-20" placeholder="Answer here" value={answers[question._id] || ''} onChange={(e) => setAnswers((prev) => ({ ...prev, [question._id]: e.target.value }))} />
                    <Button size="sm" className="mt-3" onClick={() => submitAnswer(question)}><Send className="h-4 w-4" /> Submit Answer</Button>
                    {answerResults[question._id] && (
                      <div className="mt-3 rounded-md border border-primary/30 bg-primary/10 p-3 text-sm">
                        <p className="font-semibold">Marks: {answerResults[question._id].marks}/10</p>
                        <p className="text-muted-foreground">{answerResults[question._id].feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>

        <div className="space-y-6">
          {evaluation && (
            <GlassCard glow>
              <p className="text-sm text-muted-foreground">AI Evaluation</p>
              <p className="mt-2 text-4xl font-bold">{evaluation.score}/10</p>
              <p className="mt-3 text-sm text-muted-foreground">{evaluation.feedback}</p>
              <div className="mt-4 space-y-2">
                {(evaluation.concepts || []).map((concept: string) => (
                  <p key={concept} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-success" /> {concept}</p>
                ))}
              </div>
            </GlassCard>
          )}

          <GlassCard>
            <h2 className="mb-3 text-lg font-semibold">Journal History</h2>
            <div className="space-y-3">
              {history.slice(0, 6).map((item) => (
                <div key={item._id} className="rounded-lg bg-secondary/40 p-3">
                  <p className="line-clamp-2 text-sm">{item.content}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{new Date(item.entryDate || item.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
