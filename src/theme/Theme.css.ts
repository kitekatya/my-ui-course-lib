import { createTheme } from '@vanilla-extract/css';

export const themeTokens  = {
    calendar: {
        background: '#FFFFFF',
        foreground: '#18181B',
        muted: '#8E8E93',
        weekend: '#A1A1AA',
        border: '#E4E4E7',
        hover: '#F4F4F5',
        active: '#E4E4E7',
        selected: '#18181B',
        selectedForeground: '#FFFFFF',
        disabled: '#D1D1D6',
        todayDot: '#18181B',
        focus: '#18181B',
        radius: '12px',
        padding: '16px',
        cellSize: '36px',
    },
    button: {
        borderRadius: '10px',

        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
        lineHeight: '20px',
        letterSpacing: '-0.1px',

        disabledOpacity: '0.4',

        sizes: {
            S: {
                minWidth: '140px',
                height: '36px',
                fontSize: '14px',
                paddingX: '16px',
            },
            M: {
                minWidth: '140px',
                height: '44px',
                fontSize: '15px',
                paddingX: '20px',
            },
            L: {
                minWidth: '150px',
                height: '52px',
                fontSize: '16px',
                paddingX: '24px',
            },
        },

        variants: {
            fill: {
                background: '#17171B',
                color: '#FFFFFF',
                borderColor: 'transparent',
                hoverBackground: '#2D2D33',
                activeBackground: '#050506',
                disabledBackground: '#17171B',
            },
            outline: {
                background: '#FFFFFF',
                color: '#17171B',
                borderColor: '#17171B',
                hoverBackground: '#F4F4F5',
                activeBackground: '#E7E7EA',
                disabledBackground: '#FFFFFF',
            },
            text: {
                background: '#FFFFFF',
                color: '#17171B',
                borderColor: 'transparent',
                hoverBackground: '#F4F4F5',
                activeBackground: '#E7E7EA',
                disabledBackground: '#FFFFFF',
            },
        },

        shadows: {
            default: 'none',
            hover: '0 1px 2px 0 rgba(0, 0, 0, 0.0784)',
            active: 'none',
            disabled: 'none',
        },
    },
}

export const [themeClass, vars] = createTheme(themeTokens);

export const darkThemeClass = createTheme(vars, {
    ...themeTokens,
    calendar: {
        ...themeTokens.calendar,
        background: '#18181B',
        foreground: '#F8F8FA',
        border: '#39393F',
        muted: '#A4A4AD',
        weekend: '#A1A1AA',
        hover: '#303037',
        active: '#41414A',
        disabled: '#686873',
        focus: '#B6A4FF',
        selected: '#F8F8FA',
        selectedForeground: '#18181B',
        todayDot: '#B6A4FF',
    },

});
