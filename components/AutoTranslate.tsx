'use client';

import React from 'react';
import { useAutoTranslate } from '@/hooks/useAutoTranslate';

interface AutoTranslateProps {
  children: React.ReactNode;
  text?: string;
}

export function AutoTranslate({ children, text }: AutoTranslateProps) {
  const { autoTranslate } = useAutoTranslate();
  
  if (text) {
    return <>{autoTranslate(text)}</>;
  }
  
  if (typeof children === 'string') {
    return <>{autoTranslate(children)}</>;
  }
  
  return <>{children}</>;
}

// Higher-order component to wrap existing components with auto-translation
export function withAutoTranslate<P extends object>(Component: React.ComponentType<P>) {
  return function AutoTranslatedComponent(props: P) {
    const { autoTranslate } = useAutoTranslate();
    
    // Clone the component with auto-translated props
    const translatedProps = React.useMemo(() => {
      const newProps = { ...props };
      
      // Translate common string props
      Object.keys(newProps).forEach(key => {
        const value = (newProps as any)[key];
        if (typeof value === 'string') {
          (newProps as any)[key] = autoTranslate(value);
        }
      });
      
      return newProps;
    }, [props, autoTranslate]);
    
    return <Component {...translatedProps} />;
  };
}

export default AutoTranslate;
