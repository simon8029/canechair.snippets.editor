import * as SnippetGroupActionTypes from 'types/actionTypes/SnippetGroupActionTypes';
import { SnippetGroupModel } from 'types/modelTypes/SnippetGroupModel';
import { IGetAllSnippetGroupSuccess, IAddNewSnippetGroupSuccess, IUpdateSnippetGroupSuccess, ISnippetGroupAction, IDeleteSnippetGroupSuccess } from 'actions/interfaces/ISnippetGroupAction';
import { beginAjaxCall } from './CommonActions';
import { Dispatch } from 'react-redux';
import SnippetGroupService from 'services/SnippetGroupService';
import { ajaxCallError } from './index';

export function getAllSnippetGroupSuccess(SnippetGroupArray: SnippetGroupModel[]): IGetAllSnippetGroupSuccess {
  return {
    type: SnippetGroupActionTypes.SnippetGroupGetAllSuccess,
    SnippetGroupArray: SnippetGroupArray
  };
}

export function addNewSnippetGroupSuccess(SnippetGroup: SnippetGroupModel): IAddNewSnippetGroupSuccess {
  return {
    type: SnippetGroupActionTypes.SnippetGroupAddSuccess,
    SnippetGroup: SnippetGroup
  };
}

export function updateSnippetGroupSuccess(SnippetGroup: SnippetGroupModel): IUpdateSnippetGroupSuccess {
  return {
    type: SnippetGroupActionTypes.SnippetGroupUpdateSuccess,
    SnippetGroup: SnippetGroup
  };
}

export function deleteSnippetGroupSuccess(SnippetGroup: SnippetGroupModel): IDeleteSnippetGroupSuccess {
  return {
    type: SnippetGroupActionTypes.SnippetGroupDeleteSuccess,
    SnippetGroup: SnippetGroup
  };
}

export function getAllSnippetGroup() {
  return function (dispatch: Dispatch<ISnippetGroupAction>) {
    dispatch(beginAjaxCall());
    return SnippetGroupService.getAllSnippetGroup()
      .then((res: SnippetGroupModel[]) => {
        dispatch(getAllSnippetGroupSuccess(res));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

export function addNewSnippetGroup(SnippetGroup: SnippetGroupModel): any {
  return function (dispatch: Dispatch<ISnippetGroupAction>) {
    dispatch(beginAjaxCall());
    return SnippetGroupService.addNewSnippetGroup(SnippetGroup)
      .then((s: SnippetGroupModel) => {
        dispatch(addNewSnippetGroupSuccess(s));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

export function updateSnippetGroup(SnippetGroup: SnippetGroupModel): any {
  return function (dispatch: Dispatch<ISnippetGroupAction>) {
    dispatch(beginAjaxCall());
    return SnippetGroupService.updateSnippetGroup(SnippetGroup)
      .then((res: SnippetGroupModel) => {
        dispatch(updateSnippetGroupSuccess(res));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}

export function deleteSnippetGroup(SnippetGroup: SnippetGroupModel): any {
  return function (dispatch: Dispatch<ISnippetGroupAction>) {
    dispatch(beginAjaxCall());
    return SnippetGroupService.deleteSnippetGroup(SnippetGroup)
      .then(() => {
        dispatch(deleteSnippetGroupSuccess(SnippetGroup));
      }).catch((error: Error) => {
        dispatch(ajaxCallError(error));
        throw (error);
      });
  };
}
