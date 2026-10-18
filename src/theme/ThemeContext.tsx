import type { PropsWithChildren } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { vars, themeTokens } from './Theme.css';

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends string
        ? string
        : DeepPartial<T[K]>;
};

type ThemeTokens = DeepPartial<typeof themeTokens>;

type ThemeContextProps = PropsWithChildren<{
    tokens?: ThemeTokens;
}>;

function flattenTokens(
    contract: Record<string, any>,
    tokens: Record<string, any>,
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

export function ThemeContext({
                                 tokens = {},
                                 children,
                             }: ThemeContextProps) {
    const variables = flattenTokens(vars, tokens);

    return (
        <div
            style={{
                ...assignInlineVars(variables),
                display: 'contents',
            }}
        >
            {children}
        </div>
    );
}