import styles from './Load.module.scss';

const Load = () => {
    return (
        <div class={styles.loader}>
            <div class={styles.one}></div>
            <div class={styles.two}></div>
            <div class={styles.three}></div>
            <div class={styles.four}></div>
        </div>
    );
}

export default Load;