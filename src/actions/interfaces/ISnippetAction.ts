import * as ActionTypes from 'types/actionTypes';
import { SnippetModel } from 'types/modelTypes/SnippetModel';

export interface IGetAllSnippetSuccess {
  type: ActionTypes.SnippetGetAllSuccess;
  SnippetArray: SnippetModel[];
}

export interface IGetSnippetByIdSuccess {
  type: ActionTypes.SnippetGetByIdSuccess;
  Snippet: SnippetModel;
}

export interface IAddNewSnippetSuccess {
  type: ActionTypes.SnippetAddSuccess;
  Snippet: SnippetModel;
}

export interface IUpdateSnippetSuccess {
  type: ActionTypes.SnippetUpdateSuccess;
  Snippet: SnippetModel;
}

export interface IDeleteSnippetSuccess {
  type: ActionTypes.SnippetDeleteSuccess;
  Snippet: SnippetModel;
}

export type ISnippetAction =
  IGetAllSnippetSuccess |
  IGetSnippetByIdSuccess |
  IAddNewSnippetSuccess |
  IUpdateSnippetSuccess |
  IDeleteSnippetSuccess;

export default ISnippetAction;
