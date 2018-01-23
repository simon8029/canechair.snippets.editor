import * as React from 'react';
import * as ReactDOM from 'react-dom';
import H from './components/H';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <H name=""/>, document.getElementById('root')as HTMLElement);

registerServiceWorker();
