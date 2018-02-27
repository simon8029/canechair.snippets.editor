import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { SnippetReducer } from './SnippetReducer';
import { SnippetLanguageReducer } from './SnippetLanguageReducer';

const rootReducer = combineReducers({
  routerReducer,
  SnippetArray: SnippetReducer,
  SnippetLanguageArray: SnippetLanguageReducer
});

export default rootReducer;
