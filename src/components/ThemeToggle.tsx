import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const getTheme = (): Theme =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        setTheme(getTheme());
    }, []);

    const toggleTheme = () => {
        const nextTheme: Theme = getTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem('ngawasin-theme', nextTheme);
        setTheme(nextTheme);
    };

    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-pressed={isDark}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <span className="theme-toggle__icon" aria-hidden="true">
                {isDark ? <Moon size={18} strokeWidth={1.75} /> : <Sun size={18} strokeWidth={1.75} />}
            </span>
            <span className="theme-toggle__label">{isDark ? 'Dark' : 'Light'}</span>
        </button>
    );
}
