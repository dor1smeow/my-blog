'use client';

import { Moon, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';

const THEME_STORAGE_KEY = 'doris-theme';

type ThemeMode = 'dark' | 'light';

function applyTheme(theme: ThemeMode) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function ThemeToggle() {
    function toggleTheme() {
        const nextTheme: ThemeMode = document.documentElement.classList.contains('dark')
            ? 'light'
            : 'dark';
        applyTheme(nextTheme);
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={cn(
                'inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-black/[0.045]',
                'dark:border-white/10 dark:bg-white/6 dark:hover:bg-white/10',
            )}
            aria-label="切换亮暗主题"
            title="切换亮暗主题"
        >
            <Sun className="mr-2 hidden size-4 dark:block" />
            <Moon className="mr-2 size-4 dark:hidden" />
            <span className="dark:hidden">暗色</span>
            <span className="hidden dark:inline">亮色</span>
        </button>
    );
}
