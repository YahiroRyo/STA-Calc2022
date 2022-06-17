import { Route, Routes } from 'solid-app-router';
import { Component, createSignal } from 'solid-js';

import styles from './App.module.scss';
import Navigation from './components/layouts/Navigation';
import Calc from './components/pages/Calc';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import UserCreate from './components/pages/UserCreate';

export const [isLoggedIn, setIsLoggedIn] = createSignal(false);

const App: Component = () => {
  return (
    <div class={styles.app}>
      <Navigation />
      <Routes>
        <Route path='/' element={<Calc />} />
        <Route path='/users/login' element={<Login />} />
        <Route path='/users/create' element={<UserCreate />} />
        <Route path='/users/logout' element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
