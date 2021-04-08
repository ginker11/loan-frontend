import React from 'react';




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
                    encodeURIComponent('resetting_form[' + key + ']') +
                    '=' +
                    encodeURIComponent(values[key])
                );
            }

            return '';
        })
        .join('&');

    return dispatch => {
        // dispatch(loading(true));
        console.log(dispatch);
        const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;
        const url = entrypoint + '/invite/confirm/' + token;
        return fetch(url.replace('/api/', '/'), {
            method: 'POST',
            body: queryString,
            headers
        })
            .then(response => {
                // dispatch(loading(false));
                console.log(response);

                return response.json();
            })
            // .then(retrieved => dispatch(success(retrieved)))
            .catch(e => {
                // dispatch(loading(false));
                console.log(e);

                // if (e instanceof SubmissionError) {
                    // dispatch(error(e.errors._error));
                    throw e;
                // }

                // dispatch(error(e.message));
            });
    };
}

