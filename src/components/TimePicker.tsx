import type { ChangeEvent } from 'react';

import type { TimePickerProps } from './TimePickerProps';
import './TimePicker.css';

export function TimePicker({
                               size = 'M',
                               error,
                               startAdornment,
                               endAdornment,
                               className = '',
                               onChange,
                               ...props
                           }: TimePickerProps) {
    const classes = [
        'time-picker',
        `time-picker--${size.toLowerCase()}`,
    ];

    if (error) {
        classes.push('time-picker--error');
    }

    if (className) {
        classes.push(className);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    };

    return (
        <div className="time-picker-wrapper">
            <div className={classes.join(' ')}>
                {startAdornment && (
                    <span className="time-picker-adornment">
                        {startAdornment}
                    </span>
                )}

                <input
                    className="time-picker-input"
                    type="time"
                    aria-invalid={Boolean(error)}
                    onChange={handleChange}
                    {...props}
                />

                {endAdornment && (
                    <span className="time-picker-adornment">
                        {endAdornment}
                    </span>
                )}
            </div>

            {error && (
                <span className="time-picker-error">
                    {error}
                </span>
            )}
        </div>
    );
}