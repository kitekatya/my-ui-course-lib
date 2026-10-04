import {Fragment} from 'react';

import { Button } from './components/Button';
import type {
    ButtonSize,
    ButtonVariant,
} from './components/ButtonProps';

import './App.css';
import {TimePicker} from "./components/TimePicker.tsx";
import type {TimePickerSize} from "./components/TimePickerProps.ts";

const variants: ButtonVariant[] = ['fill', 'outline', 'text'];
const sizes: ButtonSize[] = ['S', 'M', 'L'];
const timePickerSizes: TimePickerSize[] = ['S', 'M', 'L'];

function App() {
    return (
        <main className="page">
            <h1>Размеры и состояния кнопки</h1>

            <div className="button-table">
                <div className="table-cell table-header">variant</div>
                <div className="table-cell table-header">size</div>
                <div className="table-cell table-header">default</div>
                <div className="table-cell table-header">:hover</div>
                <div className="table-cell table-header">:active</div>
                <div className="table-cell table-header">disabled</div>

                {variants.map((variant) =>
                    sizes.map((size) => (
                        <Fragment key={`${variant}-${size}`}>
                            <div className="table-cell row-name">
                                {variant}
                            </div>

                            <div className="table-cell size-name">
                                {size}
                            </div>

                            <div className="table-cell button-cell">
                                <Button
                                    variant={variant}
                                    size={size}
                                >
                                    Кнопка
                                </Button>
                            </div>

                            <div className="table-cell button-cell">
                                <Button
                                    variant={variant}
                                    size={size}
                                    className={'demo-hover'}
                                >
                                    Кнопка
                                </Button>
                            </div>

                            <div className="table-cell button-cell">
                                <Button
                                    variant={variant}
                                    size={size}
                                    className={'demo-active'}
                                >
                                    Кнопка
                                </Button>
                            </div>

                            <div className="table-cell button-cell">
                                <Button
                                    variant={variant}
                                    size={size}
                                    disabled
                                >
                                    Кнопка
                                </Button>
                            </div>
                        </Fragment>
                    )),
                )}
            </div>

            <h1>Размеры и состояния TimePicker</h1>

            <div className="time-picker-table">
                <div className="table-cell table-header">size</div>
                <div className="table-cell table-header">default</div>
                <div className="table-cell table-header">value</div>
                <div className="table-cell table-header">error</div>
                <div className="table-cell table-header">disabled</div>

                {timePickerSizes.map((size) => (
                    <Fragment key={size}>
                        <div className="table-cell size-name">
                            {size}
                        </div>

                        <div className="table-cell">
                            <TimePicker
                                size={size}
                            />
                        </div>

                        <div className="table-cell">
                            <TimePicker
                                size={size}
                                value="14:30"
                            />
                        </div>

                        <div className="table-cell">
                            <TimePicker
                                size={size}
                                value="20:00"
                                error="Время должно быть с 09:00 до 18:00"
                            />
                        </div>

                        <div className="table-cell">
                            <TimePicker
                                size={size}
                                value="14:30"
                                disabled
                            />
                        </div>
                    </Fragment>
                ))}
            </div>

            <h2>Дополнительные варианты</h2>

            <div className="time-picker-examples">
                <TimePicker
                    defaultValue="14:30"
                    startAdornment={<span>UTC</span>}
                />

                <TimePicker
                    defaultValue="14:30"
                    endAdornment={<span>МСК</span>}
                />
            </div>
        </main>
    );
}

export default App;