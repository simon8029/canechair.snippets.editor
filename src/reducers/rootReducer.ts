import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { SnippetReducer } from './SnippetReducer';

const rootReducer = combineReducers({
  routerReducer,
  SnippetArray: SnippetReducer
});

export default rootReducer;
