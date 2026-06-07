import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';

export default function ProfilePage({ userName }: { userName: string }) {
  const [profile, setProfile] = useState<any>({ name: userName, bio: 'Student focused on daily learning accountability.', targetStudyMinutes: 120 });

  useEffect(() => {
    authApi.profile().then((res) => setProfile(res.data)).catch(() => undefined);
  }, []);

  const save = async () => {
    await authApi.updateProfile(profile).then((res) => setProfile(res.data)).catch(() => toast.info('Profile saved locally in demo mode.'));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Management</h1>
        <p className="mt-1 text-muted-foreground">Update learning preferences and daily accountability target.</p>
      </div>
      <GlassCard>
        <div className="space-y-4">
          <Input value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Name" />
          <Input value={profile.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Bio" />
          <Input type="number" value={profile.targetStudyMinutes || 120} onChange={(e) => setProfile({ ...profile, targetStudyMinutes: Number(e.target.value) })} placeholder="Target study minutes" />
          <Button onClick={save}>Save Profile</Button>
        </div>
      </GlassCard>
    </div>
  );
}
