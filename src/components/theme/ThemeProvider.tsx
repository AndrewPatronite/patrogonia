import React, { useState } from 'react';
import { themes, ThemeContext } from './ThemeContext';

const PATROGONIA_THEME_KEY = 'patrogoniaTheme';

const ThemeProvider = ({ children }: { children: any }) => {
    const getInitialTheme = () =>
        // @ts-ignore
        themes[localStorage.getItem(PATROGONIA_THEME_KEY) || 'light'];
    const [currentTheme, setCurrentTheme] = useState(getInitialTheme());
    const switchTheme = () => {
        const newTheme =
            currentTheme.name === 'light' ? themes.dark : themes.light;
        localStorage.setItem(PATROGONIA_THEME_KEY, newTheme.name);
        setCurrentTheme(newTheme);
    };
    const theme = { theme: currentTheme, switchTheme };

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export default ThemeProvider;
