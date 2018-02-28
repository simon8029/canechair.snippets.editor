import * as SnippetGroupActionTypes from 'types/actionTypes/SnippetGroupActionTypes';
import { ISnippetGroupAction } from 'actions/interfaces/ISnippetGroupAction';
import { SnippetGroupModel } from 'types/modelTypes/SnippetGroupModel';

export function SnippetGroupReducer(state: SnippetGroupModel[] = [], SnippetGroupAction: ISnippetGroupAction): SnippetGroupModel[] | SnippetGroupModel {
  switch (SnippetGroupAction.type) {
    case SnippetGroupActionTypes.SnippetGroupGetAllSuccess:
      return SnippetGroupAction.SnippetGroupArray;
    case SnippetGroupActionTypes.SnippetGroupAddSuccess:
      return [...state, SnippetGroupAction.SnippetGroup];
    case SnippetGroupActionTypes.SnippetGroupDeleteSuccess:
      return state.filter(s => s.id !== SnippetGroupAction.SnippetGroup.id);
    case SnippetGroupActionTypes.SnippetGroupUpdateSuccess:
      return [...state.filter(s => s.id !== SnippetGroupAction.SnippetGroup.id), Object.assign({}, SnippetGroupAction.SnippetGroup)];
    default:
      return state;
  }
}
