import axios from 'axios';
import { createResource, createSignal, For, onMount, Show } from 'solid-js';
import { isLoggedIn, setIsLoggedIn } from '../../../App';
import env from '../../../helpers/Env';
import styles from '../Calc.module.scss';

type HistoryProps = {
    setResult: (result: string) => void,
    setCanInputNum: (canInputNum: boolean) => void,
    setIsNum: (isNum: boolean) => void,
    sendedCalc: () => boolean,
};

type Calc = {
    calc: string
};

const History = ({setResult, setCanInputNum, setIsNum, sendedCalc}: HistoryProps) => {
    const getCalcHistories = async() => {
        try {
            await axios.get(`${env.API_URL}/sanctum/csrf-cookie`);
            const response = await axios.get<Calc[]>(`${env.API_URL}/calc/histories`);
            setIsLoggedIn(true);
            return response.data;
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
    }
    const [calcHistories] = createResource(sendedCalc, getCalcHistories);
    
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