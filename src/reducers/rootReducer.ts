import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { SnippetGroupReducer } from './SnippetGroupReducer';

const rootReducer = combineReducers({
  routerReducer,
  SnippetGroupArray: SnippetGroupReducer
});

export default rootReducer;
