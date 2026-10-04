import { Fragment } from 'react';

import { Button } from './components/Button';
import type {
    ButtonSize,
    ButtonVariant,
} from './components/ButtonProps';

import './App.css';

const variants: ButtonVariant[] = ['fill', 'outline', 'text'];
const sizes: ButtonSize[] = ['S', 'M', 'L'];

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
        </main>
    );
}

export default App;