import type { ButtonProps } from './ButtonProps.ts';
import * as styles from './Button.css';
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
        styles.button,
        styles.variants[variant],
        styles.sizes[size],
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