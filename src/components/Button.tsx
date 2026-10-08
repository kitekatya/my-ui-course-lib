import type { ButtonProps } from './ButtonProps.ts';
import './Button.css';
import type {ElementType} from "react";

export function Button({
                           children,
                           variant = 'fill',
                           size = 'M',
                           as = 'button',
                           className = '',
                           ...props
                       }: ButtonProps) {
    const Tag = as as ElementType;

    const classes = [
        'button',
        `button--${variant}`,
        `button--${size.toLowerCase()}`,
    ];

    if (className) {
        classes.push(className);
    }

    return (
        <Tag className={classes.join(' ')} {...props}>
            {children}
        </Tag>
    );
}