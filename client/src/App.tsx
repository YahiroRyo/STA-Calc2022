import { Route, Routes } from 'solid-app-router';
import type { Component } from 'solid-js';

import styles from './App.module.scss';
import Calc from './components/pages/Calc';
import Login from './components/pages/Login';

const App: Component = () => {
  return (
    <div class={styles.app}>
      <Routes>
        <Route path='/' element={<Calc />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
