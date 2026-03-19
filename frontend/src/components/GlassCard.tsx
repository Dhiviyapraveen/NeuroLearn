import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
}

export function GlassCard({ children, className, glow, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'glass rounded-xl p-6 transition-all duration-300 hover:border-primary/30',
        glow && 'glow-primary',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
