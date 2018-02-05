import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './components/Hello/Hello';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Hello name="Simon X.L." enthusiasmLevel={3} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
