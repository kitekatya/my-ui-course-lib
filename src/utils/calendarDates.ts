import type { Locale } from './locale.ts';

export const dayOnly = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
export const monthOnly = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const addDays = (date: Date, count: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + count);
export const addMonths = (date: Date, count: number) => new Date(date.getFullYear(), date.getMonth() + count, 1);
export const sameDay = (a: Date | null, b: Date) => !!a && dayOnly(a).getTime() === dayOnly(b).getTime();
export const sameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export function getMonthDays(month: Date, firstDayOfWeek: number): (Date | null)[] {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const offset = (month.getDay() - firstDayOfWeek + 7) % 7;
    const count = new Date(year, monthIndex + 1, 0).getDate();
    return Array.from({ length: offset + count }, (_, i) =>
        i < offset ? null : new Date(year, monthIndex, i - offset + 1));
}

export function getWeekdays(locale: Locale) {
    const short = new Intl.DateTimeFormat(locale.locale, { weekday: locale.locale === 'ar-EG' ? 'narrow' : 'short' });
    const long = new Intl.DateTimeFormat(locale.locale, { weekday: 'long' });
    return Array.from({ length: 7 }, (_, i) => {
        const index = (locale.firstDayOfWeek + i) % 7;
        const reference = new Date(2023, 0, 1 + index);
        return { index, label: short.format(reference), full: long.format(reference) };
    });
}

function shiftMonth(date: Date, count: number) {
    const month = addMonths(date, count);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return new Date(month.getFullYear(), month.getMonth(), Math.min(date.getDate(), lastDay));
}

export function getKeyboardTarget(
    date: Date,
    key: string,
    shiftKey: boolean,
    firstDayOfWeek: number,
    direction: Locale['dir'],
): Date | null {
    const offset = (date.getDay() - firstDayOfWeek + 7) % 7;
    switch (key) {
        case 'ArrowLeft': return addDays(date, direction === 'rtl' ? 1 : -1);
        case 'ArrowRight': return addDays(date, direction === 'rtl' ? -1 : 1);
        case 'ArrowUp': return addDays(date, -7);
        case 'ArrowDown': return addDays(date, 7);
        case 'Home': return addDays(date, -offset);
        case 'End': return addDays(date, 6 - offset);
        case 'PageUp': return shiftMonth(date, shiftKey ? -12 : -1);
        case 'PageDown': return shiftMonth(date, shiftKey ? 12 : 1);
        default: return null;
    }
}

