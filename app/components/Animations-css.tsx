'use client';

import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

// CSS-only animations - much faster than JS animations
export function FadeIn({ children }: FadeInProps) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}

export function SlideIn({ children, direction = 'left' }: FadeInProps & { direction?: string }) {
  const directionClass = {
    left: 'animate-slide-in-left',
    right: 'animate-slide-in-right',
    up: 'animate-slide-in-up',
    down: 'animate-slide-in-down'
  }[direction] || 'animate-slide-in-left';

  return <div className={directionClass}>{children}</div>;
}

export function ScaleIn({ children, delay = 0 }: FadeInProps) {
  return (
    <div className="animate-scale-in" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  return <>{end}{suffix}</>;
}
