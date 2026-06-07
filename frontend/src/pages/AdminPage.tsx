import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { adminApi } from '@/lib/api';

export default function AdminPage() {
  const [stats, setStats] = useState({ totalUsers: 24, activeUsers: 11, tasks: 140, journals: 88, evaluations: 72 });
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    adminApi.stats().then((res) => setStats(res.data)).catch(() => undefined);
    adminApi.users().then((res) => setUsers(res.data)).catch(() => undefined);
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Monitor platform statistics and manage user accounts.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {Object.entries(stats).map(([key, value]) => (
          <GlassCard key={key}><p className="text-2xl font-bold">{value}</p><p className="text-xs capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</p></GlassCard>
        ))}
      </div>
      <GlassCard>
        <h2 className="mb-3 font-semibold">Recent Users</h2>
        <div className="space-y-2">
          {(users.length ? users : [{ name: 'Demo Learner', email: 'demo@neurolearn.local', role: 'student' }]).map((user) => (
            <div key={user._id || user.email} className="flex items-center justify-between rounded-lg bg-secondary/40 p-3 text-sm">
              <span>{user.name}</span>
              <span className="text-muted-foreground">{user.email}</span>
              <span className="rounded-full border border-primary/30 px-2 py-1 text-xs text-primary">{user.role}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
