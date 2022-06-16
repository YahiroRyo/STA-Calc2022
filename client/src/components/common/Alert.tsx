import { JSXElement } from 'solid-js';
import styles from './Alert.module.scss';

type AlertProps = {
    title: string;
    children: JSXElement
};

const Alert = ({ title, children }: AlertProps) => {
    if (!children) return;
    return (
        <div class={styles.alert}>
            <p class={styles.alert__title}>{title}</p>
            <p class={styles.alert__text}>{children}</p>
        </div>
    )
}

export default Alert;