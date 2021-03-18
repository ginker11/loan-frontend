import { SubmissionError } from 'redux-form';
import { fetch } from '../../utils/dataAccess';

export function retrieveError(retrieveError) {
    return { type: 'ACCOUNT_INVITE_RETRIEVE_ERROR', retrieveError };
}

export function retrieveLoading(retrieveLoading) {
    return { type: 'ACCOUNT_INVITE_RETRIEVE_LOADING', retrieveLoading };
}

export function retrieveSuccess(retrieved) {
    return { type: 'ACCOUNT_INVITE_RETRIEVE_SUCCESS', retrieved };
}

export function retrieve(token) {
    return dispatch => {
        dispatch(retrieveLoading(true));

        return fetch('/invite/user/' + token)
            .then(response => response.json().then(retrieved => ({ retrieved })))
            .then(({ retrieved }) => {
                dispatch(retrieveLoading(false));
                dispatch(retrieveSuccess(retrieved));
            })
            .catch(e => {
                dispatch(retrieveLoading(false));
                dispatch(retrieveError(e.message));
            });
    };
}

export function error(error) {
    return { type: 'ACCOUNT_INVITE_CONFIRM_ERROR', error };
}

export function loading(loading) {
    return { type: 'ACCOUNT_INVITE_CONFIRM_LOADING', loading };
}

export function success(inviteConfirmed) {
    return { type: 'ACCOUNT_INVITE_CONFIRM_SUCCESS', inviteConfirmed };
}

export function inviteConfirm(item, values) {
    var headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    var token = values['confirmationToken'] || '';
    if (token) {
        delete values['confirmationToken'];
    }

    var queryString = Object.keys(values)
        .map(key => {
            if (key === 'name' || key === 'plainPassword') {
                return (
                    encodeURIComponent('registration_form[' + key + ']') +
                    '=' +
                    encodeURIComponent(values[key])
                );
            }

            return '';
        })
        .join('&');

    return dispatch => {
        dispatch(loading(true));

        return fetch('/invite/confirm/' + token, {
            method: 'POST',
            body: queryString,
            headers
        })
            .then(response => {
                dispatch(loading(false));

                return response.json();
            })
            .then(retrieved => dispatch(success(retrieved)))
            .catch(e => {
                dispatch(loading(false));

                if (e instanceof SubmissionError) {
                    dispatch(error(e.errors._error));
                    throw e;
                }

                dispatch(error(e.message));
            });
    };
}

export function reset() {
    return dispatch => {
        dispatch(loading(false));
        dispatch(error(null));
    };
}
