import * as SnippetActionTypes from 'types/actionTypes/SnippetActionTypes';
import { ISnippetAction } from 'actions/interfaces/ISnippetAction';
import { SnippetModel } from 'types/modelTypes/SnippetModel';

export function SnippetReducer(state: SnippetModel[] = [], SnippetAction: ISnippetAction): SnippetModel[] | SnippetModel {
  switch (SnippetAction.type) {
    case SnippetActionTypes.SnippetGetAllSuccess:
      return SnippetAction.SnippetArray;

    case SnippetActionTypes.SnippetAddSuccess:
      return [...state, SnippetAction.Snippet];

    case SnippetActionTypes.SnippetDeleteSuccess:
      return state.filter(s => s.id !== SnippetAction.Snippet.id);

    case SnippetActionTypes.SnippetUpdateSuccess:
      return [...state.filter(s => s.id !== SnippetAction.Snippet.id), Object.assign({}, SnippetAction.Snippet)];

    default:
      return state;
  }
}
