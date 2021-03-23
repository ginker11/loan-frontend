import React from 'react';
import { Link } from 'react-router-dom';

export const VersionLink = ({ to, onClick, ...rest }) => (
    <Link
        {...rest}
        to={to}
        onClick={event => {
            //event.preventDefault();

            if (typeof onClick === 'function') {
                onClick(event);
            }

            // @see src/utils/auth.js reloadIfDifferentVersion()
            if (!!window.appVersionUpdateRequired) {
                console.log('Redirecting to next page.');

                window.appVersionUpdateRequired = false;

                this.props.replace = true;

                return (window.location = to);
            }
        }}
    />
);
