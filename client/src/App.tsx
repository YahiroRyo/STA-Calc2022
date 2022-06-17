import { Route, Routes } from 'solid-app-router';
import type { Component } from 'solid-js';

import styles from './App.module.scss';
import Calc from './components/pages/Calc';
import Login from './components/pages/Login';
import UserCreate from './components/pages/UserCreate';

const App: Component = () => {
  return (
    <div class={styles.app}>
      <Routes>
        <Route path='/' element={<Calc />} />
        <Route path='/users/login' element={<Login />} />
        <Route path='/users/create' element={<UserCreate />} />
      </Routes>
    </div>
  );
};

export default App;
