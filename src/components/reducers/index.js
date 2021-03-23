import { combineReducers } from 'redux';
import invite from './invite';
import inviteConfirm from './inviteConfirm';

export default combineReducers({ invite, inviteConfirm });
