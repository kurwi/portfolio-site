'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 p-3 bg-brand-700 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.64 15.95c-.18-.8-.46-1.58-.84-2.3.02-.04.07-.16.12-.3a8.05 8.05 0 00-.2-1.93l-.12-.78a10.96 10.96 0 00-1.22-2.73c-.44-.84-.89-1.6-1.22-2.17a6.1 6.1 0 01-.57-1.5 6 6 0 016 6 5.96 5.96 0 01-2.97-5.59z" />
          <circle cx="12" cy="15" r="3" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m3.08-3.08l4.24-4.24M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )}
    </button>
  );
}
