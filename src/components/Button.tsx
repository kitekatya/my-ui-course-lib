import type { ButtonProps } from './ButtonProps.ts';
import './Button.css';

export function Button({
                           children,
                           variant = 'fill',
                           size = 'M',
                           className = '',
                           ...props
                       }: ButtonProps) {

    const classes = [
        'button',
        `button--${variant}`,
        `button--${size.toLowerCase()}`,
    ];

    if (className) {
        classes.push(className);
    }

    return (
        <button
            className={classes.join(' ')}
            {...props}
        >
            {children}
        </button>
    );
}