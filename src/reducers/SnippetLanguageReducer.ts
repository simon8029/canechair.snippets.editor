import * as SnippetLanguageActionTypes from 'types/actionTypes/SnippetLanguageActionTypes';
import { ISnippetLanguageAction } from 'actions/interfaces/ISnippetLanguageAction';
import { SnippetLanguageModel } from 'types/modelTypes/SnippetLanguageModel';

export function SnippetLanguageReducer(state: SnippetLanguageModel[] = [], SnippetLanguageAction: ISnippetLanguageAction): SnippetLanguageModel[] | SnippetLanguageModel {
  switch (SnippetLanguageAction.type) {
    case SnippetLanguageActionTypes.SnippetLanguageGetAllSuccess:
      return SnippetLanguageAction.SnippetLanguageArray;
    case SnippetLanguageActionTypes.SnippetLanguageAddSuccess:
      return [...state, SnippetLanguageAction.SnippetLanguage];
    case SnippetLanguageActionTypes.SnippetLanguageDeleteSuccess:
      return state.filter(s => s.id !== SnippetLanguageAction.SnippetLanguage.id);
    case SnippetLanguageActionTypes.SnippetLanguageUpdateSuccess:
      return [...state.filter(s => s.id !== SnippetLanguageAction.SnippetLanguage.id), Object.assign({}, SnippetLanguageAction.SnippetLanguage)];
    default:
      return state;
  }
}
