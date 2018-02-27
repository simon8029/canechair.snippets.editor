import * as SnippetLanguageActionTypes from 'types/actionTypes/SnippetLanguageActionTypes';
import { SnippetLanguageModel } from 'types/modelTypes/SnippetLanguageModel';
import { IGetAllSnippetLanguageSuccess, IAddNewSnippetLanguageSuccess, IUpdateSnippetLanguageSuccess, ISnippetLanguageAction, IDeleteSnippetLanguageSuccess } from 'actions/interfaces/ISnippetLanguageAction';
import { beginAjaxCall } from './CommonActions';
import { Dispatch } from 'react-redux';
import SnippetLanguageService from 'services/SnippetLanguageService';
import { ajaxCallError } from './index';

export function getAllSnippetLanguageSuccess(SnippetLanguageArray: SnippetLanguageModel[]): IGetAllSnippetLanguageSuccess {
  return {
    type: SnippetLanguageActionTypes.SnippetLanguageGetAllSuccess,
    SnippetLanguageArray: SnippetLanguageArray
  };
}

export function addNewSnippetLanguageSuccess(SnippetLanguage: SnippetLanguageModel): IAddNewSnippetLanguageSuccess {
  return {
    type: SnippetLanguageActionTypes.SnippetLanguageAddSuccess,
    SnippetLanguage: SnippetLanguage
  };
}

export function updateSnippetLanguageSuccess(SnippetLanguage: SnippetLanguageModel): IUpdateSnippetLanguageSuccess {
  return {
    type: SnippetLanguageActionTypes.SnippetLanguageUpdateSuccess,
    SnippetLanguage: SnippetLanguage
  };
}

export function deleteSnippetLanguageSuccess(SnippetLanguage: SnippetLanguageModel): IDeleteSnippetLanguageSuccess {
  return {
    type: SnippetLanguageActionTypes.SnippetLanguageDeleteSuccess,
    SnippetLanguage: SnippetLanguage
  };
}

export function getAllSnippetLanguage() {
  return function (dispatch: Dispatch<ISnippetLanguageAction>) {
    dispatch(beginAjaxCall());
    return SnippetLanguageService.getAllSnippetLanguage()
      .then((res: SnippetLanguageModel[]) => {
        dispatch(getAllSnippetLanguageSuccess(res));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

export function addNewSnippetLanguage(SnippetLanguage: SnippetLanguageModel): any {
  return function (dispatch: Dispatch<ISnippetLanguageAction>) {
    dispatch(beginAjaxCall());
    return SnippetLanguageService.addNewSnippetLanguage(SnippetLanguage)
      .then((s: SnippetLanguageModel) => {
        dispatch(addNewSnippetLanguageSuccess(s));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

export function updateSnippetLanguage(SnippetLanguage: SnippetLanguageModel): any {
  return function (dispatch: Dispatch<ISnippetLanguageAction>) {
    dispatch(beginAjaxCall());
    return SnippetLanguageService.updateSnippetLanguage(SnippetLanguage)
      .then((res: SnippetLanguageModel) => {
        dispatch(updateSnippetLanguageSuccess(res));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

export function deleteSnippetLanguage(SnippetLanguage: SnippetLanguageModel): any {
  return function (dispatch: Dispatch<ISnippetLanguageAction>) {
    dispatch(beginAjaxCall());
    return SnippetLanguageService.deleteSnippetLanguage(SnippetLanguage)
      .then(() => {
        dispatch(deleteSnippetLanguageSuccess(SnippetLanguage));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}
