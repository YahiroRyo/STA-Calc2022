import axios from "axios";
import { useNavigate } from "solid-app-router";
import { createSignal, JSXElement, Show } from "solid-js";
import env from "../../helpers/Env";
import { UserCreateValidationError } from "../../types/error/users/UserCreateValidationError";
import Alert from "../common/Alert";
import Center from "../common/Center";
import Load from "../common/Load";
import styles from "./FormTemplate.module.scss"

type FormSubmitEvent = Event & {
    submitter: HTMLElement;
    currentTarget: HTMLFormElement;
    target: Element;
}

const Login = () => {
    const [errorMessage, setErrorMessage] = createSignal<JSXElement | undefined>();
    const [isLoading, setIsLoading] = createSignal<boolean>(false);
    const [userName, setUserName] = createSignal<string>('');
    const [password, setPassword] = createSignal<string>('');
    const navigate = useNavigate();

    const create = async (e: FormSubmitEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.get(`${env.API_URL}/sanctum/csrf-cookie`);
            await axios.post(`${env.API_URL}/users/create`, {
                user_name: userName(),
                password: password(),
            });
            navigate('/');
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setErrorMessage();
                switch (e.response!.status) {
                    case 422:
                        const data = e.response!.data as UserCreateValidationError;
                        setErrorMessage(
                            <span>
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
        setIsLoading(false);
    }

    return (
        <Center>
            <div class={styles.formTemplate}>
                <Show when={!isLoading()} fallback={<Load />}>
                    <h1 class={styles.formTemplate__title}>Create / アカウント作成</h1>
                    <Show when={errorMessage()}>
                        <Alert className={styles.formTemplate__alert} title="アカウントの作成に失敗しました" message={errorMessage()} />
                    </Show>
                    <form onSubmit={create} class={styles.formTemplate__form}>
                        <div class={styles.formTemplate__form__inputForm}>
                            <label class={styles.formTemplate__form__inputForm__label} for="userName">ユーザー名</label>
                            <input class={styles.formTemplate__form__inputForm__input} onInput={(e) => setUserName(e.currentTarget.value)} name="userName" id="userName" type="text" />
                        </div>
                        <div class={styles.formTemplate__form__inputForm}>
                            <label class={styles.formTemplate__form__inputForm__label} for="password">パスワード</label>
                            <input class={styles.formTemplate__form__inputForm__input} onInput={(e) => setPassword(e.currentTarget.value)} name="password" id="password" type="password" />
                        </div>
                        <button type="submit" class={styles.formTemplate__form__submit}>作成</button>
                    </form>
                </Show>
            </div>
        </Center>
    )
}

export default Login;