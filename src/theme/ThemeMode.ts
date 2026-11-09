import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

export const ThemeModeContext = createContext<Theme>('light');

export const useTheme = () => useContext(ThemeModeContext);
