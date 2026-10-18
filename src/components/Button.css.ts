import {
    createVar,
    style,
    styleVariants,
} from '@vanilla-extract/css';

import { vars } from '../theme/Theme.css.ts';

const background = createVar();
const color = createVar();
const hoverBackground = createVar();
const activeBackground = createVar();
const disabledBackground = createVar();
const borderColor = createVar();

export const button = style({
        boxSizing: 'border-box',

        border: 'none',
        borderRadius: vars.button.borderRadius,

        cursor: 'pointer',

        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        textAlign: 'center',

        fontFamily: vars.button.fontFamily,
        fontWeight: vars.button.fontWeight,
        lineHeight: vars.button.lineHeight,
        letterSpacing: vars.button.letterSpacing,

        backgroundColor: background,
        color,
        boxShadow: vars.button.shadows.default,
        selectors: {
            '&:hover:not(:disabled):not([aria-disabled="true"])': {
                backgroundColor: hoverBackground,
                boxShadow: vars.button.shadows.hover,
            },

            '&:active:not(:disabled):not([aria-disabled="true"])': {
                backgroundColor: activeBackground,
                boxShadow: vars.button.shadows.active,
            },

            '&:disabled, &[aria-disabled="true"]': {
                backgroundColor: disabledBackground,
                opacity: vars.button.disabledOpacity,
                boxShadow: vars.button.shadows.disabled,
                cursor: 'default',
            }
        }
    }
);

export const sizes = styleVariants(
    vars.button.sizes,
    (tokens) => ({
        minWidth: tokens.minWidth,
        height: tokens.height,
        fontSize: tokens.fontSize,
        padding: `0 ${tokens.paddingX}`,
    }),
);

export const variants = styleVariants(
    vars.button.variants,
    (tokens) => ({
        vars: {
            [background]: tokens.background,
            [color]: tokens.color,
            [hoverBackground]: tokens.hoverBackground,
            [activeBackground]: tokens.activeBackground,
            [disabledBackground]: tokens.disabledBackground,
            [borderColor]: tokens.borderColor,
        },
        border: `1px solid ${borderColor}`,
    }),
);