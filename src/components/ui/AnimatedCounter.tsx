'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number; // ms
  className?: string;
  liveTicker?: boolean; // periodic lively operational increment
  tickerInterval?: number; // ms between ticks
}

export function AnimatedCounter({
  value,
  duration = 2000,
  className = '',
  liveTicker = false,
  tickerInterval = 4500,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [isLivePulsing, setIsLivePulsing] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);
  const currentValueRef = useRef<number>(0);

  // Parse string like "25,000+", "+150", "99.4%", "24/7"
  const rawString = String(value).trim();
  const numericMatch = rawString.replace(/,/g, '').match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/);
  const targetNumber = numericMatch ? parseFloat(numericMatch[0]) : 0;
  
  // Extract decimals count
  const hasDecimals = rawString.includes('.');
  const decimalPlaces = hasDecimals ? (numericMatch ? (numericMatch[0].split('.')[1]?.length || 1) : 1) : 0;

  // Extract prefix and suffix
  let prefix = '';
  let suffix = '';
  if (numericMatch) {
    const matchIndex = rawString.replace(/,/g, '').indexOf(numericMatch[0]);
    prefix = rawString.slice(0, matchIndex);
    suffix = rawString.slice(matchIndex + numericMatch[0].length);
  } else {
    prefix = rawString;
  }

  // Format helper
  const formatNumber = (num: number) => {
    let formatted: string;
    if (decimalPlaces > 0) {
      formatted = num.toFixed(decimalPlaces);
    } else {
      formatted = Math.round(num).toLocaleString();
    }
    return `${prefix}${formatted}${suffix}`;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(rawString);
      return;
    }

    const startCountAnimation = () => {
      const startTime = performance.now();
      const startValue = 0;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easeOutExpo formula: 1 - 2^(-10 * progress)
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = startValue + (targetNumber - startValue) * easeOut;
        currentValueRef.current = current;

        setDisplayValue(formatNumber(current));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          currentValueRef.current = targetNumber;
          setDisplayValue(formatNumber(targetNumber));
          hasAnimatedRef.current = true;
        }
      };

      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            startCountAnimation();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [targetNumber, duration, rawString]);

  // Lively real-time ticker effect (counts live shipments periodically)
  useEffect(() => {
    if (!liveTicker) return;

    const interval = setInterval(() => {
      if (!hasAnimatedRef.current) return;

      currentValueRef.current += 1;
      setDisplayValue(formatNumber(currentValueRef.current));
      
      // Trigger subtle pulse glow
      setIsLivePulsing(true);
      setTimeout(() => setIsLivePulsing(false), 900);
    }, tickerInterval);

    return () => clearInterval(interval);
  }, [liveTicker, tickerInterval]);

  return (
    <span
      ref={containerRef}
      className={`inline-block tabular-nums transition-all duration-300 ${
        isLivePulsing ? 'text-emerald-400 scale-105 filter drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]' : ''
      } ${className}`}
    >
      {displayValue === '0' && hasAnimatedRef.current ? rawString : displayValue}
    </span>
  );
}
