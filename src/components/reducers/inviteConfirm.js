import { combineReducers } from 'redux';

import { login } from '../../utils/auth';

export function retrieveError(state = null, action) {
    switch (action.type) {
        case 'ACCOUNT_INVITE_RETRIEVE_ERROR':
            return action.retrieveError;

        case 'ACCOUNT_INVITE_RESET':
            return null;

        default:
            return state;
    }
}

export function retrieveLoading(state = false, action) {
    switch (action.type) {
        case 'ACCOUNT_INVITE_RETRIEVE_LOADING':
            return action.retrieveLoading;

        case 'ACCOUNT_INVITE_RESET':
            return false;

        default:
            return state;
    }
}

export function retrieved(state = null, action) {
    switch (action.type) {
        case 'ACCOUNT_INVITE_RETRIEVE_SUCCESS':
            return action.retrieved;

        case 'ACCOUNT_INVITE_RESET':
            return null;

        default:
            return state;
    }
}

export function error(state = null, action) {
    switch (action.type) {
        case 'ACCOUNT_INVITE_CONFIRM_ERROR':
            return action.error;

        default:
            return state;
    }
}

export function loading(state = false, action) {
    switch (action.type) {
        case 'ACCOUNT_INVITE_CONFIRM_LOADING':
            return action.loading;

        default:
            return state;
    }
}

export function inviteConfirmed(state = null, action) {
    switch (action.type) {
        case 'ACCOUNT_INVITE_CONFIRM_SUCCESS':
            if (action.inviteConfirmed && action.inviteConfirmed.token) {
                login(action.inviteConfirmed.token); // The JWT token is stored in the browser's local storage
            }
            return action.inviteConfirmed;

        default:
            return state;
    }
}

export default combineReducers({
    retrieveError,
    retrieveLoading,
    retrieved,
    error,
    loading,
    inviteConfirmed
});
