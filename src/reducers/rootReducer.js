import { combineReducers } from 'redux';
import userManagementReducer from './userManagementReducer';

const rootReducer = combineReducers({ userManagementReducer })

export default rootReducer;
