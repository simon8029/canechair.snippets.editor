import * as React from 'react';
import * as ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

import A from './containers/H';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <A />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
