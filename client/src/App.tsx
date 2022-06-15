import type { Component } from 'solid-js';

import styles from './App.module.scss';
import Calc from './components/pages/app/Calc';

const App: Component = () => {
  return (
    <div class={styles.app}>
      <Calc />
    </div>
  );
};

export default App;
