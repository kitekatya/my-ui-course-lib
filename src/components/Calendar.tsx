import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Button } from './Button.tsx';
import type { CalendarProps } from './Calendar.types';
import * as s from './Calendar.css';
import { useLocale } from '../utils/locale.ts';
import { addMonths, dayOnly, getKeyboardTarget, getMonthDays, getWeekdays, monthOnly, sameDay, sameMonth } from '../utils/calendarDates.ts';

function Chevron({ direction }: { direction: 'previous' | 'next' }) {
    return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={direction === 'previous' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
    </svg>;
}
function CalendarIcon() {
    return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>
    </svg>;
}

export function Calendar({ value, onValueChange, month, onMonthChange, minDate, maxDate, isDateDisabled, autoFocus = false }: CalendarProps) {
    const locale = useLocale();
    const today = dayOnly(new Date());
    const [internalMonth, setInternalMonth] = useState(() => monthOnly(month ?? value ?? today));
    const visibleMonth = month ? monthOnly(month) : internalMonth;
    const [focusedDate, setFocusedDate] = useState(() => dayOnly(value ?? today));
    const focusPending = useRef(autoFocus);
    const dayRefs = useRef(new Map<number, HTMLButtonElement>());

    const isDisabled = (date: Date) =>
        (minDate !== undefined && dayOnly(date) < dayOnly(minDate)) ||
        (maxDate !== undefined && dayOnly(date) > dayOnly(maxDate)) ||
        (isDateDisabled?.(date) ?? false);

    const changeMonth = (next: Date) => {
        const normalized = monthOnly(next);
        if (!month) setInternalMonth(normalized);
        onMonthChange?.(normalized);
    };
    const navigateTo = (date: Date) => {
        setFocusedDate(date);
        focusPending.current = true;
        if (!sameMonth(date, visibleMonth)) changeMonth(date);
    };
    const selectDate = (date: Date) => {
        if (isDisabled(date)) return;
        setFocusedDate(date);
        onValueChange(dayOnly(date));
    };

    const days = getMonthDays(visibleMonth, locale.firstDayOfWeek);
    const weekdays = getWeekdays(locale);
    const monthTitle = new Intl.DateTimeFormat(locale.locale, { month: 'long', year: 'numeric' }).format(visibleMonth)
        .replace(/\s*г\.$/u, '');
    const heading = locale.locale === 'ru-RU' ? monthTitle[0].toLocaleUpperCase(locale.locale) + monthTitle.slice(1) : monthTitle;
    const dateFormatter = new Intl.DateTimeFormat(locale.locale, { day: 'numeric', month: locale.locale === 'en-US' ? 'short' : 'long', year: 'numeric' });
    const numberFormatter = new Intl.NumberFormat(locale.locale, { useGrouping: false });
    const canPrev = !minDate || addMonths(visibleMonth, -1).getTime() >= monthOnly(minDate).getTime();
    const canNext = !maxDate || addMonths(visibleMonth, 1).getTime() <= monthOnly(maxDate).getTime();
    const focusInMonth = sameMonth(focusedDate, visibleMonth) && !isDisabled(focusedDate);
    const selectedInMonth = !!value && sameMonth(value, visibleMonth) && !isDisabled(value);
    const firstEnabled = days.find((date) => date && !isDisabled(date));
    const tabStopDate = focusInMonth ? focusedDate : selectedInMonth ? value : firstEnabled;
    const tabStop = tabStopDate ? dayOnly(tabStopDate).getTime() : undefined;

    useEffect(() => {
        if (!focusPending.current || tabStop === undefined) return;
        const target = dayRefs.current.get(tabStop);
        if (!target) return;

        target.focus();
        focusPending.current = false;
    });

    const handleTodayClick = () => {
        selectDate(today);
        changeMonth(today);
        focusPending.current = true;
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
        const target = getKeyboardTarget(date, event.key, event.shiftKey, locale.firstDayOfWeek, locale.dir);
        if (!target) return;

        event.preventDefault();
        if (!isDisabled(target)) navigateTo(target);
    };

    return <div className={s.root} dir={locale.dir} aria-label={heading}>
        <div className={s.header}>
            <span className={s.heading} aria-live="polite">{heading}</span>
            <div className={s.arrows}>
                <button type="button" className={s.arrow} onClick={() => changeMonth(addMonths(visibleMonth, -1))} disabled={!canPrev} aria-label={locale.messages.calendar.prevMonth}>
                    <Chevron direction={locale.dir === 'rtl' ? 'next' : 'previous'}/>
                </button>
                <button type="button" className={s.arrow} onClick={() => changeMonth(addMonths(visibleMonth, 1))} disabled={!canNext} aria-label={locale.messages.calendar.nextMonth}>
                    <Chevron direction={locale.dir === 'rtl' ? 'previous' : 'next'}/>
                </button>
            </div>
        </div>
        <div className={s.grid} role="grid" aria-label={heading}>
            {weekdays.map((day) => <div key={day.index} className={`${s.weekday} ${locale.weekend.includes(day.index) ? s.weekdayWeekend : ''}`} role="columnheader" aria-label={day.full}>{day.label}</div>)}
            {days.map((date, index) => <div className={s.cell} role="gridcell" key={date?.getTime() ?? `blank-${index}`}>
                {date && <button
                    ref={(node) => { if (node) dayRefs.current.set(date.getTime(), node); else dayRefs.current.delete(date.getTime()); }}
                    className={[
                        s.day,
                        sameDay(value, date) ? s.dayStates.selected : locale.weekend.includes(date.getDay()) ? s.dayStates.weekend : '',
                        sameDay(today, date) ? s.dayStates.today : '',
                    ].filter(Boolean).join(' ')}
                    type="button" disabled={isDisabled(date)} aria-selected={sameDay(value, date)}
                    aria-current={sameDay(today, date) ? 'date' : undefined}
                    aria-label={dateFormatter.format(date)}
                    tabIndex={date.getTime() === tabStop ? 0 : -1}
                    onClick={() => selectDate(date)}
                    onFocus={() => setFocusedDate(date)}
                    onKeyDown={(event) => handleKeyDown(event, date)}
                >{numberFormatter.format(date.getDate())}{sameDay(today, date) && <span className={`${s.todayDot} ${sameDay(value, date) ? s.selectedTodayDot : ''}`}/>}</button>}
            </div>)}
        </div>
        <div className={s.footer}>
            <span className={s.selectedDate} aria-live="polite">{value ? dateFormatter.format(value) : '—'}</span>
            <Button className={s.todayButton} size="S" variant="outline" disabled={isDisabled(today)} onClick={handleTodayClick}>
                <CalendarIcon/>{locale.messages.calendar.today}
            </Button>
        </div>
    </div>;
}
