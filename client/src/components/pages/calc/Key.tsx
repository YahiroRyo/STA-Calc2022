import { createSignal, JSXElement, onCleanup, onMount } from 'solid-js';
import styles from '../Calc.module.scss';

type KeyProps = {
    children: JSXElement,
    addResult?: (value: string) => void,
    onClick?: () => void,
};

const Key = ({ children, addResult, onClick }: KeyProps) => {
    const [isClicked, setClicked] = createSignal(false);
    const keydownHandler = (e: KeyboardEvent) => {
        if (e.key === children!.toString() || (
            e.key === 'Enter' && children!.toString() === '=')) {
            onClick ? onClick() : undefined;
            addResult ? addResult(children!.toString()) : undefined;
        }
    }
    onMount(() => {
        window.addEventListener('keydown', keydownHandler);
    });
    onCleanup(() => {
        window.removeEventListener('keydown', keydownHandler);
    });
    
    return (
        <button
            onMouseDown={() => setClicked(true)}
            onMouseLeave={() => setClicked(false)}
            onMouseUp={() => setClicked(false)}
            onClick={() => {
                onClick ? onClick() : undefined;
                addResult ? addResult(children!.toString()) : undefined;
            }}
            class={`
                ${styles.key}
                ${isClicked() ? styles.key_click : ''}
            `}
        >
            {children}
        </button>
    )
}

export default Key;