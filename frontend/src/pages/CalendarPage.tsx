import { GlassCard } from '@/components/GlassCard';

const days = Array.from({ length: 30 }, (_, index) => ({
  day: index + 1,
  active: [1, 2, 3, 5, 6, 8, 10, 11, 12, 15, 18, 19, 22, 25, 26, 29].includes(index + 1),
}));

export default function CalendarPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Learning Calendar</h1>
        <p className="mt-1 text-muted-foreground">Calendar-based history for learning activity, journals, and consistency.</p>
      </div>
      <GlassCard>
        <div className="grid grid-cols-7 gap-3">
          {days.map((item) => (
            <div key={item.day} className={`aspect-square rounded-lg border p-3 text-sm ${item.active ? 'border-primary/50 bg-primary/20 text-primary' : 'border-border bg-secondary/40 text-muted-foreground'}`}>
              {item.day}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
