import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../theme/Theme.css';

export const root = style({
    width: '252px',
    padding: vars.calendar.padding,
    border: `1px solid ${vars.calendar.border}`,
    borderRadius: vars.calendar.radius,
    background: vars.calendar.background,
    color: vars.calendar.foreground,
    fontFamily: vars.button.fontFamily,
});

export const header = style({
    position: 'relative',
    display: 'flex',
    height: '36px',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
});

export const heading = style({
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '18px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
});

export const arrows = style({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    justifyContent: 'space-between',
    pointerEvents: 'none',
});

export const arrow = style({
    // 34px content + 2px border = 36px total.
    width: '34px',
    height: '34px',
    display: 'grid',
    placeItems: 'center',
    border: `1px solid ${vars.calendar.foreground}`,
    borderRadius: '8px',
    background: vars.calendar.background,
    color: vars.calendar.foreground,
    cursor: 'pointer',
    pointerEvents: 'auto',
    selectors: {
        '&:hover:not(:disabled)': { background: vars.calendar.hover },
        '&:active:not(:disabled)': { background: vars.calendar.active },
        '&:disabled': { opacity: 0.35, cursor: 'not-allowed' },
        '&:focus-visible': { outline: `2px solid ${vars.calendar.focus}`, outlineOffset: '2px' },
    },
});

export const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 36px)',
    gridAutoRows: vars.calendar.cellSize,
    rowGap: '4px',
    direction: 'inherit',
});

export const weekday = style({
    display: 'grid',
    placeItems: 'center',
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: '13px',
    color: vars.calendar.muted,
});

export const weekdayWeekend = style({ color: vars.calendar.muted });
export const cell = style({ display: 'grid', placeItems: 'center' });

export const day = style({
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
    // 32px content + 4px border = 36px total.
    width: '32px',
    height: '32px',
    padding: 0,
    border: '2px solid transparent',
    borderRadius: '8px',
    background: 'transparent',
    color: vars.calendar.foreground,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '17px',
    selectors: {
        '&:hover:not(:disabled)': { background: vars.calendar.hover },
        '&:active:not(:disabled)': { background: vars.calendar.active },
        '&:disabled': { color: vars.calendar.disabled, cursor: 'not-allowed', background: 'transparent' },
        '&:focus-visible': { borderColor: vars.calendar.focus, outline: 'none', zIndex: 1 },
    },
});

// States are composable: selected + today, weekend + today, etc.
export const dayStates = styleVariants({
    selected: {
        background: vars.calendar.selected,
        color: vars.calendar.selectedForeground,
        fontWeight: 600,
        selectors: {
            '&:hover:not(:disabled)': { background: vars.calendar.selected },
            '&:active:not(:disabled)': { background: vars.calendar.selected },
            '&:disabled': { background: 'transparent', color: vars.calendar.disabled },
        },
    },
    weekend: { color: vars.calendar.weekend },
    today: { fontWeight: 600 },
    // Reserved for days from neighboring months (not rendered by Calendar yet).
    outside: { color: '#C4C4CA' },
});

export const todayDot = style({
    position: 'absolute',
    width: '4px',
    height: '4px',
    bottom: '3px',
    insetInlineStart: 'calc(50% - 2px)',
    borderRadius: '50%',
    background: vars.calendar.todayDot,
});

export const selectedTodayDot = style({ background: vars.calendar.selectedForeground });

export const footer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: `1px solid ${vars.calendar.border}`,
});

export const selectedDate = style({
    minWidth: 0,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '17px',
    color: vars.calendar.muted,
    whiteSpace: 'nowrap',
});

export const todayButton = style({
    width: '113px',
    minWidth: '113px',
    height: '36px',
    paddingInlineStart: '12px',
    paddingInlineEnd: '16px',
    gap: '8px',
    flexShrink: 0,
});
