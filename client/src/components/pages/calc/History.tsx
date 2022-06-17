import axios from 'axios';
import { createSignal, For, onMount, Show } from 'solid-js';
import { isLoggedIn, setIsLoggedIn } from '../../../App';
import styles from '../Calc.module.scss';

type HistoryProps = {
    setResult: (result: string) => void,
    setCanInputNum: (canInputNum: boolean) => void,
    setIsNum: (isNum: boolean) => void,
};

type Calc = {
    calc: string
};

const History = ({setResult, setCanInputNum, setIsNum}: HistoryProps) => {
    const [calcHistories, setCalcHistories] = createSignal<Calc[]>();

    onMount(async() => {
        try {
            await axios.get('http://localhost:8080/sanctum/csrf-cookie');
            const response = await axios.get('http://localhost:8080/api/calc/histories');
            setCalcHistories(response.data);
            setIsLoggedIn(true);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                switch (e.response!.status) {
                    case 401:
                        setIsLoggedIn(false);
                        break;
                    default:
                        setIsLoggedIn(true);
                        break;
                }
            }
        }
    });
    
    const setResultCalcHistory = (e: MouseEvent & {
        currentTarget: HTMLLIElement;
        target: Element;
    }) => {
        setResult(e.currentTarget.innerText);
        setCanInputNum(false);
        setIsNum(true);
    }

    return (
        <div class={styles.history}>
            <h1 class={styles.history__title}>計算履歴</h1>
            <Show
                when={calcHistories()}
                fallback={
                    isLoggedIn()
                    ? <p class={styles.history__error}>現在の計算履歴はございません</p>
                    : <p class={styles.history__error}>アカウントを作成するかログインをすると計算履歴が保存されます</p>
                }
            >
                <ul class={styles.history__list}>
                    <For each={calcHistories()}>{
                        (calcHistory) => <li class={styles.history__list__item} onClick={setResultCalcHistory}>{calcHistory.calc}</li>
                    }</For>
                </ul>
            </Show>
        </div>
    );
}

export default History;