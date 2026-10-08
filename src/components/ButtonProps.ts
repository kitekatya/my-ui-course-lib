import type { ComponentPropsWithRef, ReactNode } from 'react';

export type variant = 'fill' | 'outline' | 'text';

export type size = 'S' | 'M' | 'L';

type BaseProps = {
    children: ReactNode;
    variant?: variant;
    size?: size;
    className?: string;
};

type ButtonElementProps = BaseProps &
    ComponentPropsWithRef<'button'> & {
    as?: 'button';
};

type AnchorElementProps = BaseProps &
    ComponentPropsWithRef<'a'> & {
    as: 'a';
};

export type ButtonProps = ButtonElementProps | AnchorElementProps;