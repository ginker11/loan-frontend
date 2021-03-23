import { SubmissionError } from 'redux-form';
import { fetch } from '../../utils/dataAccess';

export function resendInvitation(item) {
    return dispatch => {
        return fetch(item['@id'] + '/resend-invitation')
            .then(response => response.json().then(retrieved => ({ retrieved })))
            .then(({ retrieved }) => {})
            .catch(e => {
                if (e instanceof SubmissionError) {
                    throw e;
                }
            });
    };
}
