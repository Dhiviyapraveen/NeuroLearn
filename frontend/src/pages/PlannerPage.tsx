import { useEffect, useMemo, useState } from 'react';
import { CalendarPlus, CheckCircle2, Pencil, Trash2 } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { taskApi } from '@/lib/api';
import { toast } from 'sonner';

type Task = {
  _id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  estimatedMinutes?: number;
};

const todayKey = () => new Date().toISOString().slice(0, 10);

export default function PlannerPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { _id: 'demo-1', title: 'Learn OOP concepts', dueDate: todayKey(), priority: 'high', completed: false, estimatedMinutes: 45 },
    { _id: 'demo-2', title: 'Complete DBMS Unit 3', dueDate: todayKey(), priority: 'medium', completed: true, estimatedMinutes: 60 },
    { _id: 'demo-3', title: 'Solve 5 LeetCode problems', dueDate: todayKey(), priority: 'high', completed: false, estimatedMinutes: 75 },
  ]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState(todayKey());

  const completed = tasks.filter((task) => task.completed).length;
  const completion = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  useEffect(() => {
    taskApi.list(todayKey()).then((res) => {
      if (res.data?.length) setTasks(res.data);
    }).catch(() => undefined);
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    const draft = { title, priority, dueDate: new Date(dueDate).toISOString(), estimatedMinutes: 45 };
    const localTask = { _id: crypto.randomUUID(), ...draft, dueDate, completed: false };
    setTasks((prev) => [localTask, ...prev]);
    setTitle('');
    try {
      const res = await taskApi.create(draft);
      setTasks((prev) => prev.map((task) => task._id === localTask._id ? res.data : task));
    } catch {
      toast.error('Unable to save task. Please ensure you are logged in and the backend server is running.');
    }
  };

  const toggleTask = async (task: Task) => {
    const completedNext = !task.completed;
    setTasks((prev) => prev.map((item) => item._id === task._id ? { ...item, completed: completedNext } : item));
    if (!task._id.startsWith('demo')) {
      await taskApi.update(task._id, { completed: completedNext }).catch(() => undefined);
    }
  };

  const deleteTask = async (task: Task) => {
    setTasks((prev) => prev.filter((item) => item._id !== task._id));
    if (!task._id.startsWith('demo')) await taskApi.remove(task._id).catch(() => undefined);
  };

  const pending = useMemo(() => tasks.filter((task) => !task.completed), [tasks]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Daily Learning Planner</h1>
        <p className="mt-1 text-muted-foreground">Create goals, set priority, and complete today with accountability.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <GlassCard><p className="text-2xl font-bold">{completed}</p><p className="text-sm text-muted-foreground">Tasks completed today</p></GlassCard>
        <GlassCard><p className="text-2xl font-bold">{pending.length}</p><p className="text-sm text-muted-foreground">Pending tasks</p></GlassCard>
        <GlassCard><p className="text-2xl font-bold">{completion}%</p><Progress className="mt-3" value={completion} /></GlassCard>
      </div>

      <GlassCard>
        <div className="grid gap-3 md:grid-cols-[1fr_160px_140px_auto]">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add today's learning task" />
          <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <select value={priority} onChange={(e) => setPriority(e.target.value as Task['priority'])} className="rounded-md border border-border bg-secondary px-3 text-sm">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <Button onClick={addTask}><CalendarPlus className="h-4 w-4" /> Add</Button>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task._id} className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-secondary/40 p-3">
              <button onClick={() => toggleTask(task)}>
                <CheckCircle2 className={`h-5 w-5 ${task.completed ? 'text-success' : 'text-muted-foreground'}`} />
              </button>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${task.completed ? 'text-muted-foreground line-through' : ''}`}>{task.title}</p>
                <p className="text-xs text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()} • {task.priority} priority • {task.estimatedMinutes || 30} min</p>
              </div>
              <Button size="icon" variant="secondary"><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="destructive" onClick={() => deleteTask(task)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
