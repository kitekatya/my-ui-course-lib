import { Fragment, useRef } from 'react';

import { Button } from './components/Button';
import type {
    size,
    variant,
} from './components/ButtonProps';

import './App.css';
import {ThemeContext} from "./theme/ThemeContext.tsx";
import {themeTokens} from "./theme/Theme.css.ts";

const variants: variant[] = ['fill', 'outline', 'text'];
const sizes: size[] = ['S', 'M', 'L'];

function App() {
    const inputRef = useRef<HTMLInputElement>(null);

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
                                <ThemeContext
                                    tokens={{
                                        button: {
                                            variants: {
                                                [variant]: {
                                                    activeBackground: themeTokens.button.variants[variant].hoverBackground,
                                                    background: themeTokens.button.variants[variant].hoverBackground,
                                                }
                                        },
                                        shadows: {
                                                default: themeTokens.button.shadows.hover,
                                        },
                                    }}}
                                >
                                    <Button
                                        variant={variant}
                                        size={size}>
                                        Кнопка
                                    </Button>
                                </ThemeContext>
                            </div>

                            <div className="table-cell button-cell">
                                <ThemeContext
                                    tokens={{
                                        button: {
                                            variants: {
                                                [variant]: {
                                                    hoverBackground: themeTokens.button.variants[variant].activeBackground,
                                                    background: themeTokens.button.variants[variant].activeBackground,
                                                }
                                            },
                                            shadows: {
                                                default: themeTokens.button.shadows.active,
                                                hover: themeTokens.button.shadows.active,
                                            },
                                        }}}
                                >
                                    <Button
                                        variant={variant}
                                        size={size}>
                                        Кнопка
                                    </Button>
                                </ThemeContext>
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
            <div className="links-table">
                <div className="table-cell table-header">variant</div>
                <div className="table-cell table-header">size</div>
                <div className="table-cell table-header">default</div>
                <div className="table-cell table-header">disabled</div>

                {variants.map((variant) =>
                    sizes.map((size) => (
                        <Fragment key={`link-${variant}-${size}`}>
                            <div className="table-cell row-name">
                                {variant}
                            </div>

                            <div className="table-cell size-name">
                                {size}
                            </div>

                            <div className="table-cell button-cell">
                                <Button
                                    as="a"
                                    href="https://example.com"
                                    variant={variant}
                                    size={size}
                                >
                                    Ссылка
                                </Button>
                            </div>

                            <div className="table-cell button-cell">
                                <Button
                                    as="a"
                                    variant={variant}
                                    size={size}
                                    aria-disabled="true"
                                    tabIndex={-1}
                                    onClick={(event) => event.preventDefault()}
                                >
                                    Ссылка
                                </Button>
                            </div>
                        </Fragment>
                    )),
                )}
            </div>
            <div className="ref-demo">
                <input
                    ref={inputRef}
                    placeholder="Введите текст"
                />

                <Button
                    onClick={() => inputRef.current?.focus()}
                >
                    Установить фокус
                </Button>
            </div>

            <h2>Кастомизация темы</h2>

            <div className="theme-demo">
                <div className="theme-demo-item">
                    <span>По умолчанию</span>
                    <Button size="S" variant="outline">
                        Кнопка
                    </Button>
                </div>

                <div className="theme-demo-item">
                    <span>С переопределёнными токенами</span>
                    <ThemeContext
                        tokens={{
                            button: {
                                borderRadius: '20px',
                                sizes: {
                                    S: {
                                        paddingX: '25px',
                                    },
                                },
                                variants: {
                                    outline: {
                                        background: '#6750B4',
                                        color: '#FFFFFF',
                                        hoverBackground: '#6750A8',
                                        activeBackground: '#6750C8',
                                    },
                                },
                            },
                        }}
                    >
                        <Button size="S" variant="outline">
                            Подтюненная кнопка
                        </Button>
                    </ThemeContext>
                </div>
            </div>
        </main>
    );
}

export default App;