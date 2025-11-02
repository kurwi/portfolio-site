'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeIn({ children, delay = 0, duration = 1000 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: 'translateY(20px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ],
            {
              duration,
              delay,
              fill: 'forwards',
              easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, duration]);

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(20px)' }}>
      {children}
    </div>
  );
}

export function SlideIn({ children, delay = 0, direction = 'left', duration = 1100 }: FadeInProps & { direction?: 'left' | 'right' | 'up' | 'down'; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const getTransform = (direction: string) => {
    const transforms = {
      left: 'translateX(-40px)',
      right: 'translateX(40px)',
      up: 'translateY(-40px)',
      down: 'translateY(40px)'
    };
    return transforms[direction as keyof typeof transforms] || transforms.left;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: getTransform(direction) },
              { opacity: 1, transform: 'translate(0, 0)' }
            ],
            {
              duration,
              delay,
              fill: 'forwards',
              easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, direction, duration]);

  return (
    <div ref={ref} style={{ opacity: 0, transform: getTransform(direction) }}>
      {children}
    </div>
  );
}

export function CountUp({ end = 100, duration = 2000, suffix = '', delay = 0 }: { end?: number; duration?: number; suffix?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const countRef = useRef({ current: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && countRef.current.current === 0) {
          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(progress * (end - startValue) + startValue);
            
            if (element) {
              element.textContent = value.toLocaleString() + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function ScaleIn({ children, delay = 0, duration = 900 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: 'scale(0.9)' },
              { opacity: 1, transform: 'scale(1)' }
            ],
            {
              duration,
              delay,
              fill: 'forwards',
              easing: 'cubic-bezier(0.33, 0.66, 0.66, 1)'
            }
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, duration]);

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'scale(0.9)' }}>
      {children}
    </div>
  );
}

export function RotateIn({ children, delay = 0, duration = 950 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: 'rotate(-10deg) scale(0.9)' },
              { opacity: 1, transform: 'rotate(0deg) scale(1)' }
            ],
            {
              duration,
              delay,
              fill: 'forwards',
              easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, duration]);

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'rotateY(90deg)' }}>
      {children}
    </div>
  );
}

export function BounceIn({ children, delay = 0, duration = 1200 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: 'scale(0.3)' },
              { opacity: 1, transform: 'scale(1.05)' },
              { transform: 'scale(0.95)' },
              { transform: 'scale(1)' }
            ],
            {
              duration,
              delay,
              fill: 'forwards',
              easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, duration]);

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'scale(0.3)' }}>
      {children}
    </div>
  );
}
