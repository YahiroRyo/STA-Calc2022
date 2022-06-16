import { createSignal, JSXElement } from "solid-js";
import FetchError from "../../helpers/exceptions/FetchError";
import Alert from "../common/Alert";
import Center from "../common/Center";
import styles from "./Login.module.scss"

type FormSubmitEvent = Event & {
    submitter: HTMLElement;
    currentTarget: HTMLFormElement;
    target: Element;
}

const Login = () => {
    const [errorMessage, setErrorMessage] = createSignal<JSXElement | undefined>();

    const login = async (e: FormSubmitEvent) => {
        e.preventDefault();
        try {
            let response: Response;
            response = await fetch('http://localhost:8080/sanctum/csrf-cookie');
            if (!response.ok) throw new FetchError(response);
            response = await fetch('http://localhost:8080/users/login', { method: 'POST'});
            if (!response.ok) throw new FetchError(response);
        } catch (e) {
            if (e instanceof FetchError) {
                switch (e.status) {
                    case 302:
                    case 401:
                        setErrorMessage('ログインに失敗しました');
                        break;
                    default:
                        setErrorMessage('不明なエラーが発生しました');
                        break;
                }
            }
        }
    }

    return (
        <Center>
            <div class={styles.login}>
                <Alert title="エラーが発生しました">{errorMessage()}</Alert>
                <h1 class={styles.login__title}>Login / ログイン</h1>
                <form onSubmit={login} class={styles.login__form}>
                    <div class={styles.login__form__inputForm}>
                        <label class={styles.login__form__inputForm__label} for="userName">ユーザー名</label>
                        <input class={styles.login__form__inputForm__input} name="userName" id="userName" type="text" />
                    </div>
                    <div class={styles.login__form__inputForm}>
                        <label class={styles.login__form__inputForm__label} for="password">パスワード</label>
                        <input class={styles.login__form__inputForm__input} name="password" id="password" type="password" />
                    </div>
                    <button type="submit" class={styles.login__form__submit}>ログイン</button>
                </form>
            </div>
        </Center>
    )
}

export default Login;