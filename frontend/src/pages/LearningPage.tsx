import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Lightbulb, Sparkles, BookOpen, Code, ChevronRight } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { CognitiveStateBadge } from '@/components/CognitiveStateBadge';
import { useBehaviorTracking } from '@/hooks/useBehaviorTracking';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { learningApi } from '@/lib/api';

export const lessons = [
  {
    id: 1,
    title: 'Neural Networks',
    level: 'basic' as const,
    content: `Neural Networks are computational models inspired by the human brain. They are used to recognize patterns and make decisions from data.\n\nA neural network consists of three main layers:\n\n1. Input Layer\n   This layer receives data such as numbers, text, or images.\n\n2. Hidden Layers\n   These layers process the data using weights and activation functions. They help in identifying patterns.\n\n3. Output Layer\n   This layer produces the final result such as classification or prediction.\n\nWorking Process:\n* Input data is passed into the network\n* Each neuron multiplies inputs with weights\n* The result is passed through an activation function\n* Output is generated\n* Error is calculated and corrected using backpropagation\n\nKey Idea:\nNeural networks learn by adjusting weights to reduce error.\n\nExample:\nUsed in image recognition, handwriting detection, and basic AI systems.\n\nCode Concept:\nfunction neuron(inputs, weights) {\n  let sum = 0;\n  for (let i = 0; i < inputs.length; i++) {\n    sum += inputs[i] * weights[i];\n  }\n  return sum;\n}\n`,
    simplified: 'Neural networks learn by adjusting weights to reduce prediction error.',
    quiz: [
      { question: 'What does Input Layer do?', options: ['Receives data', 'Predicts output', 'Updates weights'], answer: 'Receives data' },
      { question: 'Hidden Layers use?', options: ['Weights and activation', 'File system', 'Networking'], answer: 'Weights and activation' },
      { question: 'Output layer gives?', options: ['Final result', 'Data input', 'Loss value'], answer: 'Final result' },
      { question: 'Which step corrects error?', options: ['Backpropagation', 'Activation', 'Input'], answer: 'Backpropagation' },
      { question: 'Neural networks are inspired by?', options: ['Human brain', 'Cars', 'Libraries'], answer: 'Human brain' },
      { question: 'What is adjusted to reduce error?', options: ['Weights', 'Inputs', 'Outputs'], answer: 'Weights' },
      { question: 'Which function introduces non-linearity?', options: ['Activation function', 'Sum function', 'Row function'], answer: 'Activation function' },
      { question: 'Example application is?', options: ['Handwriting detection', 'Cooking', 'Driving'], answer: 'Handwriting detection' },
      { question: 'Neurons compute?', options: ['Weighted sum', 'Sort operations', 'Print statements'], answer: 'Weighted sum' },
      { question: 'Final output is for?', options: ['Classification or prediction', 'Deleting files', 'Browsing'], answer: 'Classification or prediction' },
    ],
  },
  {
    id: 2,
    title: 'Machine Learning',
    level: 'intermediate' as const,
    content: `Machine Learning is a technique where systems learn from data and improve performance without being explicitly programmed.\n\nTypes of Machine Learning:\n\n1. Supervised Learning\n   The model is trained using labeled data.\n   Example: Spam detection\n\n2. Unsupervised Learning\n   The model finds patterns in unlabeled data.\n   Example: Customer segmentation\n\n3. Reinforcement Learning\n   The model learns using rewards and penalties.\n   Example: Game AI\n\nWorking Process:\n* Collect data\n* Clean and preprocess data\n* Train the model\n* Test accuracy\n* Make predictions\n\nKey Idea:\nMachine learning identifies patterns and uses them to make decisions.\n\nExample:\nUsed in recommendation systems, fraud detection, and chatbots.\n\nCode Concept:\nfunction trainModel(data) {\n  let model = {};\n  data.forEach(item => {\n    model[item.input] = item.output;\n  });\n  return model;\n}\n`,
    simplified: 'Machine learning uses data to train models that make predictions for new inputs.',
    quiz: [
      { question: 'Supervised learning uses?', options: ['Labeled data', 'Unlabeled data', 'Only rules'], answer: 'Labeled data' },
      { question: 'Unsupervised finds?', options: ['Patterns', 'Labels', 'Errors'], answer: 'Patterns' },
      { question: 'Reinforcement uses?', options: ['Rewards and penalties', 'Random choice', 'Manual code'], answer: 'Rewards and penalties' },
      { question: 'First step is?', options: ['Collect data', 'Train model', 'Test accuracy'], answer: 'Collect data' },
      { question: 'Data clean step is called?', options: ['Preprocess', 'Output', 'Compile'], answer: 'Preprocess' },
      { question: 'Model evaluation checks?', options: ['Accuracy', 'Weight size', 'Color'], answer: 'Accuracy' },
      { question: 'Example of ML application?', options: ['Fraud detection', 'CSS layout', 'File system'], answer: 'Fraud detection' },
      { question: 'Training uses?', options: ['Data', 'Manual features', 'No input'], answer: 'Data' },
      { question: 'Make predictions after?', options: ['Testing', 'Collecting', 'Deleting'], answer: 'Testing' },
      { question: 'Key idea of ML?', options: ['Pattern-based decisions', 'Hardcoded rules', 'Random output'], answer: 'Pattern-based decisions' },
    ],
  },
  {
    id: 3,
    title: 'Deep Learning',
    level: 'advanced' as const,
    content: `Deep Learning is an advanced form of Machine Learning that uses multi-layered neural networks to solve complex problems.\n\nKey Concepts:\n\n1. Deep Neural Networks\n   These have many hidden layers that can learn complex patterns.\n\n2. Automatic Feature Extraction\n   The system automatically identifies important features from data.\n\n3. High Accuracy\n   Works well with large datasets and complex tasks.\n\nWorking Process:\n* Input data (image, audio, text)\n* Pass through multiple layers\n* Extract high-level features\n* Generate prediction\n\nKey Idea:\nDeep learning can understand complex patterns without manual feature design.\n\nExample:\nUsed in self-driving cars, voice assistants, and face recognition.\n\nCode Concept:\nfunction deepLearning(input) {\n  return input\n    .map(x => x * 0.5)\n    .map(x => x + 1);\n}\n`,
    simplified: 'Deep learning uses deep networks to model complex patterns from large data.',
    quiz: [
      { question: 'Deep learning uses?', options: ['Multi-layer networks', 'Decision trees', 'Linear equations'], answer: 'Multi-layer networks' },
      { question: 'Automatic feature extraction means?', options: ['Learn features from data', 'Manually design features', 'No training'], answer: 'Learn features from data' },
      { question: 'Deep learning works well with?', options: ['Large datasets', 'Tiny datasets', 'No data'], answer: 'Large datasets' },
      { question: 'Example application?', options: ['Self-driving cars', 'Basic calculator', 'Text editor'], answer: 'Self-driving cars' },
      { question: 'Hidden layers are used to?', options: ['Learn complex patterns', 'Store images', 'Collect data'], answer: 'Learn complex patterns' },
      { question: 'High accuracy is achieved by?', options: ['Deep models', 'Random chance', 'No training'], answer: 'Deep models' },
      { question: 'Input types include?', options: ['Image, audio, text', 'Only numbers', 'Only labels'], answer: 'Image, audio, text' },
      { question: 'What is code concept doing?', options: ['Transforms input values', 'Sorts arrays', 'Creates UI'], answer: 'Transforms input values' },
      { question: 'Deep learning reduces need for?', options: ['Manual feature design', 'Data collection', 'Model training'], answer: 'Manual feature design' },
      { question: 'Which model type is deep learning?', options: ['Advanced AI model', 'Simple linear model', 'Static rule system'], answer: 'Advanced AI model' },
    ],
  },
];

export default function LearningPage() {
  const navigate = useNavigate();
  const { trackingData, cognitiveState } = useBehaviorTracking();
  const [activeLesson, setActiveLesson] = useState(0);
  const [code, setCode] = useState('// Write your neural network code here\n\nfunction neuron(inputs, weights) {\n  let sum = 0;\n  for (let i = 0; i < inputs.length; i++) {\n    sum += inputs[i] * weights[i];\n  }\n  return sigmoid(sum);\n}\n');
  const [showMessage, setShowMessage] = useState('');

  const lesson = lessons[activeLesson];

  const getStateColor = () => {
    switch (cognitiveState.state) {
      case 'focused':
        return 'text-emerald-400 border-emerald-400/40 bg-emerald-500/10';
      case 'confused':
        return 'text-amber-300 border-amber-300/40 bg-amber-500/10';
      case 'distracted':
        return 'text-rose-400 border-rose-400/40 bg-rose-500/10';
      default:
        return 'text-sky-400 border-sky-400/40 bg-sky-500/10';
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Take a Quiz':
        navigate(`/learn/quiz/${lessons[activeLesson].id}`);
        break;
      case 'Get Hint':
        setShowMessage('Hint: Focus on the highlighted key ideas in this lesson.');
        break;
      case 'Simplify Content':
        setShowMessage('Simplified summary: ' + lessons[activeLesson].simplified);
        break;
      case 'Next Challenge':
        setActiveLesson((prev) => (prev + 1) % lessons.length);
        setShowMessage('Next lesson loaded.');
        break;
      default:
        break;
    }
  };

  const handleSubmitCode = async () => {
    try {
      const response = await learningApi.analyzeCode(code, lesson.id);
      const hint = response.data.hint || 'Code submitted. Keep practicing!';
      setShowMessage(hint);
      toast.success('Code analysis received.');
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Could not analyze code. Try again.';
      toast.error(message);
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex gap-6 max-w-[1600px] mx-auto">
      {/* LEFT: Learning Content */}
      <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-auto pr-2">
        {/* Lesson Tabs */}
        <div className="flex gap-2 shrink-0">
          {lessons.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setActiveLesson(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                i === activeLesson
                  ? 'bg-primary/15 text-primary neon-border'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {l.title.split(' ').slice(0, 3).join(' ')}
            </button>
          ))}
        </div>

        {/* Lesson Content */}
        <GlassCard className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getStateColor()}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{lesson.title}</h2>
                  <span className="text-xs text-muted-foreground capitalize">{lesson.level}</span>
                </div>
              </div>
              <div className="prose prose-invert max-w-none text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                {lesson.content}
              </div>
            </motion.div>
          </AnimatePresence>
        </GlassCard>

        {/* Code Editor */}
        <GlassCard className="shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Code Editor</span>
            <span className="text-xs text-muted-foreground ml-auto">Tracking typing behavior...</span>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-h-[140px] bg-background/80 border-border font-mono text-sm resize-none focus:border-primary"
          />
          <div className="flex justify-end mt-3">
            <Button onClick={handleSubmitCode} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary">
              <Sparkles className="w-4 h-4 mr-1" /> Submit Code
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* RIGHT: AI Panel */}
      <div className="w-80 shrink-0 flex flex-col gap-4 overflow-auto">
        {/* Cognitive State */}
        <GlassCard glow>
          <div className="flex items-center gap-2 mb-4">
            <Brain className={`w-5 h-5 animate-brain-pulse ${getStateColor().split(' ')[0]}`} />
            <span className="text-sm font-semibold">AI Cognitive Monitor</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Current State</p>
              <span className={`inline-flex px-3 py-1 rounded-full border ${getStateColor()} font-semibold text-xs`}>{cognitiveState.state.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              {[
                { label: 'WPM', value: trackingData.typingSpeed },
                { label: 'Backspace', value: trackingData.backspaceCount },
                { label: 'Mouse', value: `${trackingData.mouseSpeed}px/s` },
                { label: 'Idle', value: `${trackingData.pauseTime}s` },
              ].map((m) => (
                <div key={m.label} className="p-2 rounded-lg bg-secondary/50">
                  <p className="text-lg font-bold text-accent">{m.value}</p>
                  <p className="text-[10px] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Adaptive Message */}
        <GlassCard delay={0.1}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-warning" />
            <span className="text-sm font-semibold">Adaptive Suggestion</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${cognitiveState.state}-${cognitiveState.response.action}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
                <ChevronRight className="w-3 h-3" />
                {cognitiveState.response.action.toUpperCase()}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cognitiveState.response.content}
              </p>
            </motion.div>
          </AnimatePresence>
          {showMessage && <p className="mt-2 text-xs text-emerald-300">{showMessage}</p>}
        </GlassCard>

        {/* Quick Actions */}
        <GlassCard delay={0.2}>
          <p className="text-sm font-semibold mb-3">Quick Actions</p>
          <div className="space-y-2">
            {['Take a Quiz', 'Get Hint', 'Simplify Content', 'Next Challenge'].map((action) => (
              <button
                key={action}
                onClick={() => handleQuickAction(action)}
                className="w-full text-left text-sm px-3 py-2.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between"
              >
                {action}
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
