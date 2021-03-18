import { SubmissionError } from 'redux-form';
import { fetch } from '../../utils/dataAccess';

export function error(error) {
    return { type: 'ACCOUNT_INVITE_ERROR', error };
}

export function loading(loading) {
    return { type: 'ACCOUNT_INVITE_LOADING', loading };
}

export function success(invited) {
    return { type: 'ACCOUNT_INVITE_SUCCESS', invited };
}

export function invite(values) {
    var headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    var queryString = Object.keys(values)
        .map(key => {
            if (key === 'asRole') {
                return (
                    encodeURIComponent('invitation_form[' + key + ']') +
                    '=' +
                    encodeURIComponent(values[key].value)
                );
            }

            return (
                encodeURIComponent('invitation_form[' + key + ']') +
                '=' +
                encodeURIComponent(values[key])
            );
        })
        .join('&');

    return dispatch => {
        dispatch(loading(true));

        return fetch('/invite', { method: 'POST', body: queryString, headers })
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

        // clear out the existing data to allow many users to be invited after redirects
        dispatch(success(null));
    };
}
