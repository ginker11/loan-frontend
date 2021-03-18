import { combineReducers } from 'redux';

export function error(state = null, action) {
    switch (action.type) {
        case 'ACCOUNT_INVITE_ERROR':
            return action.error;

        default:
            return state;
    }
}

export function loading(state = false, action) {
    switch (action.type) {
        case 'ACCOUNT_INVITE_LOADING':
            return action.loading;

        default:
            return state;
    }
}

export function invited(state = null, action) {
    switch (action.type) {
        case 'ACCOUNT_INVITE_SUCCESS':
            return action.invited;

        default:
            return state;
    }
}

export default combineReducers({ error, loading, invited });
