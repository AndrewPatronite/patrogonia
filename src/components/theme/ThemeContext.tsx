import { createContext } from 'react';

export interface Theme {
    name: string;
    borderColor: string;
    backgroundColor: string;
    headingColor: string;
    labelColor: string;
    linkColor: string;
    textColor: string;
}

export const themes = {
    light: {
        name: 'light',
        borderColor: 'white',
        backgroundColor: '#fafafa',
        headingColor: '#120c74',
        labelColor: '#333333',
        linkColor: 'blue',
        textColor: '#606060',
    },
    dark: {
        name: 'dark',
        borderColor: '#e6e6e6',
        backgroundColor: '#383838',
        headingColor: '#ffffff',
        labelColor: '#cccccc',
        linkColor: 'white',
        textColor: '#e6e6e6',
    },
};

export const ThemeContext = createContext<{
    theme: Theme;
    switchTheme: () => void;
}>({ theme: themes.light, switchTheme: () => {} });
