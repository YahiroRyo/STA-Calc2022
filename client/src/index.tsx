/* @refresh reload */
import { render } from 'solid-js/web';

import './index.scss';
import App from './App';
import { Router } from 'solid-app-router';
import axios from 'axios';

axios.defaults.withCredentials = true;

render(() => (<Router><App /></Router>), document.getElementById('root') as HTMLElement);
