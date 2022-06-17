import { createSignal, Index, Show } from "solid-js";
import styles from './Calc.module.scss';
import Result from "./calc/Result";
import Key from "./calc/Key";
import Center from "../common/Center";
import History from "./calc/History";
import { isLoggedIn } from "../../App";
import axios from "axios";
import Alert from "../common/Alert";

const isNumeric = (val: string) => {
    return /^-?\d+$/.test(val);
}

const Calc = () => {
    const [result, setResult] = createSignal<string>('');
    const [error, setError] = createSignal<string>('');
    const [isNum, setIsNum] = createSignal<boolean>(false);
    const [canInputNum, setCanInputNum] = createSignal<boolean>(true);
    const [sendedCalc, setSendedCalc] = createSignal<boolean>(true);
    
    const addResult = (value: string) => {
        if ((!isNumeric(value) && !isNum()) || value === '=') return;
        if (!isNumeric(value)) setCanInputNum(true);
        if (!canInputNum()) return;
        setSendedCalc(false);
        setIsNum(isNumeric(value));
        setResult((result) => result + (isNum() ? value : ' ' + value + ' '));
    }
    const calc = async () => {
        if (!result()) return;
        if (!isNumeric(result().slice(result().length - 2, -1)) && !isNum()) return;
        if (isLoggedIn()) {
            try {
                await axios.get('http://localhost:8080/sanctum/csrf-cookie');
                await axios.post('http://localhost:8080/api/calc/histories', {
                    calc: result()
                });
                setSendedCalc(true);
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    switch (e.response!.status) {
                        case 422:
                            setError('500文字以内の計算式のみ履歴に入れることが可能です');
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        const resultValue = eval(result());
        setResult(resultValue);
        setCanInputNum(false);
    }

    return (
        <Center>
            <div class={styles.calc}>
                <History
                    setIsNum={setIsNum}
                    setResult={setResult}
                    setCanInputNum={setCanInputNum}
                    sendedCalc={sendedCalc}
                />
                <div class={styles.calc__calculator}>
                    <Show
                        when={error()}
                    >
                        <Alert title="エラー" message={error()} />
                    </Show>
                    <Result><span>{result()}</span></Result>
                    <div class={styles.calc__calculator__keyboard}>
                        <div class={styles.calc__calculator__keyboard__options}>
                            <Key onClick={() => {
                                setResult('');
                                setIsNum(false);
                                setCanInputNum(true);
                                setSendedCalc(true);
                            }}><span class={styles.calc__calculator__keyboard__options__ac}>AC</span></Key>
                        </div>
                        <div class={styles.calc__calculator__keyboard__numbers}>
                            <Index each={[...Array(9)]}>{(num, index) => 
                                <Key addResult={addResult}>{(index + 1).toString()}</Key>
                            }</Index>
                            <Key addResult={addResult}>0</Key>
                        </div>
                        <div class={styles.calc__calculator__keyboard__calc}>
                            <Key addResult={addResult}>+</Key>
                            <Key addResult={addResult}>-</Key>
                            <Key addResult={addResult}>/</Key>
                            <Key addResult={addResult}>*</Key>
                            <Key onClick={calc} addResult={addResult}>=</Key>
                        </div>
                    </div>
                </div>
            </div>
        </Center>
    );
}

export default Calc;