import axios from "axios";
import { useNavigate } from "solid-app-router";
import { createSignal, JSXElement, Show } from "solid-js";
import { LoginValidationError } from "../../types/error/login/LoginValidationError";
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
    const [userName, setUserName] = createSignal<string>('');
    const [password, setPassword] = createSignal<string>('');
    const navigate = useNavigate();

    const login = async (e: FormSubmitEvent) => {
        e.preventDefault();
        try {
            await axios.get('http://localhost:8080/sanctum/csrf-cookie');
            await axios.post('http://localhost:8080/users/login', {
                user_name: userName(),
                password: password(),
            });
            navigate('/');
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setErrorMessage();
                switch (e.response!.status) {
                    case 401:
                        setErrorMessage('ログインに失敗しました');
                        break;
                    case 422:
                        const data = e.response!.data as LoginValidationError;
                        setErrorMessage(
                            <span>
                                <p>ログインに失敗しました</p>
                                {data.errors.user_name ? <p>・{data.errors.user_name[0]}</p> : <></>}
                                {data.errors.password ? <p>・{data.errors.password[0]}</p> : <></>}
                            </span>
                        );
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
                <h1 class={styles.login__title}>Login / ログイン</h1>
                <Show when={errorMessage()}>
                    <Alert className={styles.login__alert} title="エラーが発生しました" message={errorMessage()} />
                </Show>
                <form onSubmit={login} class={styles.login__form}>
                    <div class={styles.login__form__inputForm}>
                        <label class={styles.login__form__inputForm__label} for="userName">ユーザー名</label>
                        <input class={styles.login__form__inputForm__input} onInput={(e) => setUserName(e.currentTarget.value)} name="userName" id="userName" type="text" />
                    </div>
                    <div class={styles.login__form__inputForm}>
                        <label class={styles.login__form__inputForm__label} for="password">パスワード</label>
                        <input class={styles.login__form__inputForm__input} onInput={(e) => setPassword(e.currentTarget.value)} name="password" id="password" type="password" />
                    </div>
                    <button type="submit" class={styles.login__form__submit}>ログイン</button>
                </form>
            </div>
        </Center>
    )
}

export default Login;