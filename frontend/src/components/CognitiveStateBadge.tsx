import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface Props {
  state: 'focused' | 'confused' | 'distracted';
}

const stateConfig = {
  focused: { label: 'Focused', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
  confused: { label: 'Confused', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  distracted: { label: 'Distracted', color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' },
};

export function CognitiveStateBadge({ state }: Props) {
  const config = stateConfig[state];
  return (
    <motion.div
      key={state}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${config.bg} ${config.border}`}
    >
      <Brain className={`w-4 h-4 animate-brain-pulse ${config.color}`} />
      <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
    </motion.div>
  );
}
