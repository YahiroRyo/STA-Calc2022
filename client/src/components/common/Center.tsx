import { JSXElement } from 'solid-js';
import styles from './Center.module.scss';

type CenterProps = {
    children: JSXElement
};

const Center = ({ children }: CenterProps) => {
    return <div class={styles.center}>{children}</div>
}

export default Center;