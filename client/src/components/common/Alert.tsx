import { JSXElement } from 'solid-js';
import styles from './Alert.module.scss';

type AlertProps = {
    title: string;
    message: JSXElement;
    className?: string;
};

const Alert = ({ className, title, message }: AlertProps) => {
    return (
        <div class={`${styles.alert} ${className}`}>
            <p class={styles.alert__title}>{title}</p>
            <p class={styles.alert__text}>{message}</p>
        </div>
    )
}

export default Alert;