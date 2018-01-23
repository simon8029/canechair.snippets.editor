import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import H from './components/H';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <H/>, document.getElementById('root'));
registerServiceWorker();
