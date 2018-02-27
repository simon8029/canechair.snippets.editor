import * as ActionTypes from 'types/actionTypes';
import { SnippetLanguageModel } from 'types/modelTypes/SnippetLanguageModel';

export interface IGetAllSnippetLanguageSuccess {
  type: ActionTypes.SnippetLanguageGetAllSuccess;
  SnippetLanguageArray: SnippetLanguageModel[];
}

export interface IGetSnippetLanguageByIdSuccess {
  type: ActionTypes.SnippetLanguageGetByIdSuccess;
  SnippetLanguage: SnippetLanguageModel;
}

export interface IAddNewSnippetLanguageSuccess {
  type: ActionTypes.SnippetLanguageAddSuccess;
  SnippetLanguage: SnippetLanguageModel;
}

export interface IUpdateSnippetLanguageSuccess {
  type: ActionTypes.SnippetLanguageUpdateSuccess;
  SnippetLanguage: SnippetLanguageModel;
}

export interface IDeleteSnippetLanguageSuccess {
  type: ActionTypes.SnippetLanguageDeleteSuccess;
  SnippetLanguage: SnippetLanguageModel;
}

export type ISnippetLanguageAction =
  IGetAllSnippetLanguageSuccess |
  IGetSnippetLanguageByIdSuccess |
  IAddNewSnippetLanguageSuccess |
  IUpdateSnippetLanguageSuccess |
  IDeleteSnippetLanguageSuccess;

export default ISnippetLanguageAction;
