import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';

interface Props {
  onLogin: (name: string, email: string, token: string) => void;
}

export default function AuthPage({ onLogin }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const response = await authApi.login({ email, password });
        const { token, name: userName, email: userEmail } = response.data;
        onLogin(userName, userEmail, token);
        toast.success('Welcome back!');
      } else {
        const registerResponse = await authApi.register({ name, email, password });
        const { token, name: userName, email: userEmail } = registerResponse.data;
        onLogin(userName, userEmail, token);
        toast.success('Account created!');
      }
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-4">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--background))_0%,hsl(var(--card))_55%,hsl(190_38%_10%)_100%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative z-10 mr-10 hidden max-w-lg lg:block">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Adaptive education platform</p>
        <h1 className="mt-4 text-5xl font-bold leading-tight">NeuroLearn turns behavior signals into better study decisions.</h1>
        <p className="mt-4 text-muted-foreground">
          Track focus, detect confusion, recommend the next learning action, and prove progress with mastery evidence.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
          {['Cognitive state', 'Mastery map', 'Quiz remediation'].map((item) => (
            <div key={item} className="rounded-lg border border-border bg-card/70 p-3">
              {item}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-4 glow-primary"
          >
            <Brain className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gradient mb-2">NeuroLearn</h1>
          <p className="text-muted-foreground text-sm">Behavior-aware learning, not static lessons.</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <div className="flex mb-6 rounded-lg bg-secondary p-1">
            {['Login', 'Register'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setIsLogin(i === 0)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  (i === 0 ? isLogin : !isLogin)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-secondary border-border focus:border-primary"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-secondary border-border focus:border-primary"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-secondary border-border focus:border-primary"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11 glow-primary"
            >
              {loading ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
