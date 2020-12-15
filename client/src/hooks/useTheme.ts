/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';

const getStoredTheme = (): 'dark' | 'light' => {
    const storedTheme = localStorage.getItem('theme');
    if (!storedTheme) return 'light';
    return JSON.parse(storedTheme);
};

const useColors = (): IUseTheme => {
    const [theme, setTheme] = useState<'dark' | 'light'>(getStoredTheme());

    const toggleTheme = () => {
        const updatedTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(updatedTheme);
        if (updatedTheme === 'light') {
            document.querySelector('html')!.classList.remove('dark');
        } else {
            document.querySelector('html')!.classList.add('dark');
        }
        localStorage.setItem('theme', JSON.stringify(updatedTheme));
    };
    return {
        theme,
        toggleTheme,
    };
};

export default useColors;
