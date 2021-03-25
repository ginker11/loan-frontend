import { ENTRYPOINT } from '../config/entrypoint';
import { SubmissionError } from 'redux-form';
import get from 'lodash/get';
import has from 'lodash/has';
import mapValues from 'lodash/mapValues';

import {
    applyAuthHeader,
    logoutIfUnauthorized,
    reloadIfDifferentVersion
} from './auth';

import { set } from 'lodash';

const MIME_TYPE = 'application/ld+json';

export function fetch(id, options = {}) {
    if ('undefined' === typeof options.headers) options.headers = new Headers();

    applyAuthHeader(options.headers);

    if (null === options.headers.get('Accept'))
        options.headers.set('Accept', MIME_TYPE);

    if (
        'undefined' !== options.body &&
        !(options.body instanceof FormData) &&
        null === options.headers.get('Content-Type')
    )
        options.headers.set('Content-Type', MIME_TYPE);

    return global.fetch(new URL(id, ENTRYPOINT), options).then(response => {
        reloadIfDifferentVersion(response);

        if (response.ok) return response;

        return response.json().then(json => {
            const error = json['hydra:description'] || response.statusText;

            logoutIfUnauthorized(response, json, error);

            if (!json.violations) throw Error(error);

            let errors = { _error: error };
            json.violations.map(
                violation => (errors[violation.propertyPath] = violation.message)
            );

            // allow errors to be displayed in array fields
            let arrayErrors = {};
            json.violations.map(violation => {
                set(arrayErrors, violation.propertyPath, violation.message);
                return violation;
            });
            errors = { ...errors, ...arrayErrors };

            throw new SubmissionError(errors);
        });
    });
}

export function mercureSubscribe(url, topics) {
    topics.forEach(topic =>
        url.searchParams.append('topic', new URL(topic, ENTRYPOINT))
    );

    return new EventSource(url.toString());
}

export function normalize(data) {
    if (has(data, 'hydra:member')) {
        // Normalize items in collections
        data['hydra:member'] = data['hydra:member'].map(item => normalize(item));

        return data;
    }

    // Flatten nested documents
    return mapValues(data, value =>
        Array.isArray(value)
            ? value.map(v => get(v, '@id', v))
            : get(value, '@id', value)
    );
}

export function extractHubURL(response) {
    const linkHeader = response.headers.get('Link');
    if (!linkHeader) return null;

    const matches = linkHeader.match(
        /<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/
    );

    return matches && matches[1] ? new URL(matches[1], ENTRYPOINT) : null;
}
