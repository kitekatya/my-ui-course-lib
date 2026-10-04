import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'fill' | 'outline' | 'text';

export type ButtonSize = 'S' | 'M' | 'L';

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
}