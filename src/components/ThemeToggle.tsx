import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
      }}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' && <Sun className="w-5 h-5 text-yellow-500" />}
      {theme === 'dark' && <Moon className="w-5 h-5 text-blue-400" />}
      {theme === 'system' && <Monitor className="w-5 h-5 text-gray-400" />}
    </button>
  );
}
