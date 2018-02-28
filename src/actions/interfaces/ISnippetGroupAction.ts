import * as ActionTypes from 'types/actionTypes';
import { SnippetGroupModel } from 'types/modelTypes/SnippetGroupModel';

export interface IGetAllSnippetGroupSuccess {
  type: ActionTypes.SnippetGroupGetAllSuccess;
  SnippetGroupArray: SnippetGroupModel[];
}

export interface IGetSnippetGroupByIdSuccess {
  type: ActionTypes.SnippetGroupGetByIdSuccess;
  SnippetGroup: SnippetGroupModel;
}

export interface IAddNewSnippetGroupSuccess {
  type: ActionTypes.SnippetGroupAddSuccess;
  SnippetGroup: SnippetGroupModel;
}

export interface IUpdateSnippetGroupSuccess {
  type: ActionTypes.SnippetGroupUpdateSuccess;
  SnippetGroup: SnippetGroupModel;
}

export interface IDeleteSnippetGroupSuccess {
  type: ActionTypes.SnippetGroupDeleteSuccess;
  SnippetGroup: SnippetGroupModel;
}

export type ISnippetGroupAction =
  IGetAllSnippetGroupSuccess |
  IGetSnippetGroupByIdSuccess |
  IAddNewSnippetGroupSuccess |
  IUpdateSnippetGroupSuccess |
  IDeleteSnippetGroupSuccess;

export default ISnippetGroupAction;
