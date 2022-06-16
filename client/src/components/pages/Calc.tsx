import { createSignal, Index } from "solid-js";
import styles from './Calc.module.scss';
import Result from "./calc/Result";
import Key from "./calc/Key";
import Center from "../common/Center";

const isNumeric = (val: string) => {
    return /^-?\d+$/.test(val);
}

const Calc = () => {
    const [result, setResult] = createSignal<string>('');
    const [isNum, setIsNum] = createSignal<boolean>(false);
    const [canInputNum, setCanInputNum] = createSignal<boolean>(true);
    
    const addResult = (value: string) => {
        if ((!isNumeric(value) && !isNum()) || value === '=') return;
        if (!isNumeric(value)) setCanInputNum(true);
        if (!canInputNum()) return;
        setIsNum(isNumeric(value));
        setResult((result) => result + (isNum() ? value : ' ' + value + ' '));
    }
    const calc = () => {
        if (!isNumeric(result().slice(result().length - 2, -1)) && !isNum()) return;
        const resultValue = eval(result());
        setResult(resultValue);
        setCanInputNum(false);
    }

    return (
        <Center>
            <div class={styles.calc}>
                <Result><span>{result()}</span></Result>
                <div class={styles.calc__keyboard}>
                    <div class={styles.calc__keyboard__options}>
                        <Key onClick={() => setResult('')}><span class={styles.calc__keyboard__options__ac}>AC</span></Key>
                    </div>
                    <div class={styles.calc__keyboard__numbers}>
                        <Index each={[...Array(9)]}>{(num, index) => 
                            <Key addResult={addResult}>{(index + 1).toString()}</Key>
                        }</Index>
                        <Key addResult={addResult}>0</Key>
                    </div>
                    <div class={styles.calc__keyboard__calc}>
                        <Key addResult={addResult}>+</Key>
                        <Key addResult={addResult}>-</Key>
                        <Key addResult={addResult}>/</Key>
                        <Key addResult={addResult}>*</Key>
                        <Key onClick={calc} addResult={addResult}>=</Key>
                    </div>
                </div>
            </div>
        </Center>
    );
}

export default Calc;