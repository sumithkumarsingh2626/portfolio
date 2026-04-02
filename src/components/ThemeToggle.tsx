'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center',
        'w-10 h-10 rounded-lg',
        'bg-gray-900 dark:bg-gray-800',
        'border border-gray-800 dark:border-gray-700',
        'hover:bg-gray-800 dark:hover:bg-gray-700',
        'transition-colors duration-300',
        'focus:outline-none focus:ring-2 focus:ring-blue-500'
      )}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-900" />
      )}
    </button>
  );
}
