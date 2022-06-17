import { Link } from "solid-app-router";
import { Show } from "solid-js";
import { isLoggedIn } from "../../App";
import styles from './Navigation.module.scss'

const Navigation = () => {
    return (
        <nav class={styles.nav}>
            <ul class={styles.nav__list}>
                <li class={styles.nav__list__item}>
                    <Link class={styles.nav__list__item__link} href="/">電卓</Link>
                </li>
                <Show
                    when={isLoggedIn()}
                    fallback={
                        <>
                            <li class={styles.nav__list__item}>
                                <Link class={styles.nav__list__item__link} href="/users/login">ログイン</Link>
                            </li>
                            <li class={styles.nav__list__item}>
                                <Link class={styles.nav__list__item__link} href="/users/create">アカウント作成</Link>
                            </li>
                        </>
                    }
                >
                    <>
                        <li class={styles.nav__list__item}>
                            <Link class={styles.nav__list__item__link} href="/users/logout">ログアウト</Link>
                        </li>
                    </>
                </Show>
            </ul>
        </nav>
    )
}

export default Navigation;