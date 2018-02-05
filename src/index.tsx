import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { enthusiasm } from './reducers/index';
import Hello from './containers/Hello';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(enthusiasm, { name: 'Simon', enthusiasmLevel: 1 });

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
