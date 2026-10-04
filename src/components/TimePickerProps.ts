import type {
    InputHTMLAttributes,
    ReactNode,
} from 'react';

export type TimePickerSize = 'S' | 'M' | 'L';

export interface TimePickerProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'type' | 'size' | 'onChange'
    > {
    size?: TimePickerSize;

    error?: string;

    startAdornment?: ReactNode;
    endAdornment?: ReactNode;

    onChange?: (value: string) => void;
}