import { useState, useEffect, useRef, useCallback } from 'react';
import { trackingApi } from '@/lib/api';

export interface CognitiveState {
  state: 'focused' | 'confused' | 'distracted';
  response: {
    action: 'simplify' | 'challenge' | 'engage' | 'assist';
    content: string;
  };
}

interface TrackingData {
  typingSpeed: number;
  backspaceCount: number;
  mouseSpeed: number;
  pauseTime: number;
}

interface TrackingResponse {
  state: 'focused' | 'confused' | 'distracted' | 'neutral' | 'struggling';
  response: {
    action: string;
    content: string;
  };
}

export function useBehaviorTracking() {
  const [trackingData, setTrackingData] = useState<TrackingData>({
    typingSpeed: 0, backspaceCount: 0, mouseSpeed: 0, pauseTime: 0,
  });
  const [cognitiveState, setCognitiveState] = useState<CognitiveState>({
    state: 'focused',
    response: { action: 'challenge', content: 'You\'re doing great! Keep going.' },
  });

  const keyTimestamps = useRef<number[]>([]);
  const backspaceRef = useRef(0);
  const mousePositions = useRef<{ x: number; y: number; t: number }[]>([]);
  const lastActivity = useRef(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    lastActivity.current = Date.now();
    if (e.key === 'Backspace') {
      backspaceRef.current++;
    } else {
      keyTimestamps.current.push(Date.now());
      if (keyTimestamps.current.length > 50) keyTimestamps.current.shift();
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    lastActivity.current = Date.now();
    mousePositions.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });
    if (mousePositions.current.length > 50) mousePositions.current.shift();
  }, []);

  const calculateMetrics = useCallback((): TrackingData => {
    const now = Date.now();
    const recentKeys = keyTimestamps.current.filter(t => now - t < 10000);
    const typingSpeed = recentKeys.length > 1
      ? (recentKeys.length / ((now - recentKeys[0]) / 1000)) * 60
      : 0;

    const recentMouse = mousePositions.current.filter(p => now - p.t < 5000);
    let mouseSpeed = 0;
    if (recentMouse.length > 1) {
      let totalDist = 0;
      for (let i = 1; i < recentMouse.length; i++) {
        const dx = recentMouse[i].x - recentMouse[i - 1].x;
        const dy = recentMouse[i].y - recentMouse[i - 1].y;
        totalDist += Math.sqrt(dx * dx + dy * dy);
      }
      const dt = (recentMouse[recentMouse.length - 1].t - recentMouse[0].t) / 1000;
      mouseSpeed = dt > 0 ? totalDist / dt : 0;
    }

    const pauseTime = (now - lastActivity.current) / 1000;

    return {
      typingSpeed: Math.round(typingSpeed),
      backspaceCount: backspaceRef.current,
      mouseSpeed: Math.round(mouseSpeed),
      pauseTime: Math.round(pauseTime),
    };
  }, []);

  // Simulate cognitive state locally (since backend may not be running)
  const inferState = useCallback((data: TrackingData): CognitiveState => {
    if (data.pauseTime > 15 || (data.mouseSpeed > 800 && data.typingSpeed < 10)) {
      return {
        state: 'distracted',
        response: { action: 'engage', content: 'Let\'s try a quick quiz to get back on track!' },
      };
    }
    if (data.backspaceCount > 10 || (data.typingSpeed > 0 && data.typingSpeed < 20)) {
      return {
        state: 'confused',
        response: { action: 'simplify', content: 'Let me break this down into simpler steps for you.' },
      };
    }
    if (data.typingSpeed > 60) {
      return {
        state: 'focused',
        response: { action: 'challenge', content: 'Great focus! Ready for a harder challenge?' },
      };
    }
    return {
      state: 'focused',
      response: { action: 'assist', content: 'You\'re on the right track. Keep going!' },
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);

    intervalRef.current = setInterval(async () => {
      const metrics = calculateMetrics();
      setTrackingData(metrics);

      try {
        const response = await trackingApi.send(metrics);
        const data = response.data as TrackingResponse;

        const normalizedState: CognitiveState = {
          state: data.state === 'focused' || data.state === 'confused' || data.state === 'distracted'
            ? data.state
            : 'focused',
          response: {
            action: ['simplify', 'challenge', 'engage', 'assist'].includes(data.response?.action)
              ? (data.response.action as CognitiveState['response']['action'])
              : 'assist',
            content: data.response?.content || 'Continue learning.',
          },
        };

        setCognitiveState(normalizedState);
      } catch (error) {
        // Fallback in case backend is unavailable
        setCognitiveState(inferState(metrics));
      }

      // Reset backspace count each interval
      backspaceRef.current = 0;
    }, 7000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [handleKeyDown, handleMouseMove, calculateMetrics, inferState]);

  return { trackingData, cognitiveState };
}
