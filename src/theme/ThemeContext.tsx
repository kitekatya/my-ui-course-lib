import type { PropsWithChildren } from 'react';
import { ThemeModeContext, useTheme, type Theme } from './ThemeMode';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { vars, themeTokens, themeClass, darkThemeClass } from './Theme.css';

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends string
        ? string
        : DeepPartial<T[K]>;
};

type ThemeTokens = DeepPartial<typeof themeTokens>;

type ThemeContextProps = PropsWithChildren<{
    theme?: Theme;
    tokens?: ThemeTokens;
}>;

type TokenTree = { [key: string]: string | TokenTree };

function flattenTokens(
    contract: TokenTree,
    tokens: TokenTree,
): Record<string, string> {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(tokens)) {
        const variable = contract[key];

        if (typeof value === 'string' && typeof variable === 'string') {
            result[variable] = value;
        } else if (
            value && typeof value === 'object' &&
            variable && typeof variable === 'object'
        ) {
            Object.assign(result, flattenTokens(variable, value));
        }
    }

    return result;
}

export function ThemeContext({ theme, tokens = {}, children }: ThemeContextProps) {
    const parentTheme = useTheme();
    const currentTheme = theme ?? parentTheme;
    const variables = flattenTokens(vars as unknown as TokenTree, tokens as TokenTree);

    return (
        <ThemeModeContext.Provider value={currentTheme}>
        <div
            className={theme === undefined ? undefined : currentTheme === 'dark' ? darkThemeClass : themeClass}
            style={{
                ...assignInlineVars(variables),
                display: 'contents',
            }}
        >
            {children}
        </div>
        </ThemeModeContext.Provider>
    );
}