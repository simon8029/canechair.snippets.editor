import * as SnippetActionTypes from 'types/actionTypes/SnippetActionTypes';
import { SnippetModel } from 'types/modelTypes/SnippetModel';
import { IGetAllSnippetSuccess, IAddNewSnippetSuccess, IUpdateSnippetSuccess, ISnippetAction, IDeleteSnippetSuccess } from 'actions/interfaces/ISnippetAction';
import { beginAjaxCall } from './CommonActions';
import { Dispatch } from 'react-redux';
import SnippetService from 'services/SnippetService';
import { ajaxCallError } from './index';

export function getAllSnippetSuccess(SnippetArray: SnippetModel[]): IGetAllSnippetSuccess {
  return {
    type: SnippetActionTypes.SnippetGetAllSuccess,
    SnippetArray: SnippetArray
  };
}

export function addNewSnippetSuccess(Snippet: SnippetModel): IAddNewSnippetSuccess {
  return {
    type: SnippetActionTypes.SnippetAddSuccess,
    Snippet: Snippet
  };
}

export function updateSnippetSuccess(Snippet: SnippetModel): IUpdateSnippetSuccess {
  return {
    type: SnippetActionTypes.SnippetUpdateSuccess,
    Snippet: Snippet
  };
}

export function deleteSnippetSuccess(Snippet: SnippetModel): IDeleteSnippetSuccess {
  return {
    type: SnippetActionTypes.SnippetDeleteSuccess,
    Snippet: Snippet
  };
}

export function getAllSnippet() {
  return function (dispatch: Dispatch<ISnippetAction>) {
    dispatch(beginAjaxCall());
    return SnippetService.getAllSnippet()
      .then((res: SnippetModel[]) => {
        dispatch(getAllSnippetSuccess(res));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

export function addNewSnippet(Snippet: SnippetModel): any {
  return function (dispatch: Dispatch<ISnippetAction>) {
    dispatch(beginAjaxCall());
    return SnippetService.addNewSnippet(Snippet)
      .then((s: SnippetModel) => {
        dispatch(addNewSnippetSuccess(s));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

export function updateSnippet(Snippet: SnippetModel): any {
  return function (dispatch: Dispatch<ISnippetAction>) {
    dispatch(beginAjaxCall());
    return SnippetService.updateSnippet(Snippet)
      .then((res: SnippetModel) => {
        dispatch(updateSnippetSuccess(res));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

export function deleteSnippet(Snippet: SnippetModel): any {
  return function (dispatch: Dispatch<ISnippetAction>) {
    dispatch(beginAjaxCall());
    return SnippetService.deleteSnippet(Snippet)
      .then(() => {
        dispatch(deleteSnippetSuccess(Snippet));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}
