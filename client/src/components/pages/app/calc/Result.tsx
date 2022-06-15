import { JSXElement } from 'solid-js';
import styles from '../Calc.module.scss';

type ResultProps = {
    children: JSXElement;
};

const Result = ({ children }: ResultProps) => {
    return (
        <p class={styles.result}>{children}</p>
    );
}

export default Result;