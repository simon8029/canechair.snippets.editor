import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { SnippetLanguageReducer } from './SnippetLanguageReducer';

const rootReducer = combineReducers({
  routerReducer,
  SnippetLanguageArray: SnippetLanguageReducer
});

export default rootReducer;
