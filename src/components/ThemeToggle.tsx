import { useEffect, useState } from 'react';

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
                {isDark ? '☾' : '☀'}
            </span>
            <span className="theme-toggle__label">{isDark ? 'Dark' : 'Light'}</span>
        </button>
    );
}
