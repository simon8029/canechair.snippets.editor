import { SnippetModel } from 'types/modelTypes/SnippetModel';
import { SnippetLanguageModel } from 'types/modelTypes/SnippetLanguageModel';

export type StoreState = {
  SnippetArray: SnippetModel[];
  SnippetLanguageArray: SnippetLanguageModel[];
};

export default StoreState;
