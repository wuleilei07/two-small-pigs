import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router/index.js';
import * as serviceWorker from '../src/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
