import React, { Component } from 'react';
import { connect } from 'react-redux';
import { /*Link,*/ Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import InviteConfirmForm from './InviteConfirmForm';
import {
    inviteConfirm,
    reset,
    retrieve
} from '../actions/invite/inviteConfirm';

import { isLoggedIn } from '../utils/auth';
import Card from 'react-bootstrap/Card';


class InviteConfirm extends Component {
    static propTypes = {
        retrieved: PropTypes.object,
        retrieveLoading: PropTypes.bool.isRequired,
        retrieveError: PropTypes.string,
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        inviteConfirmed: PropTypes.object,
        retrieve: PropTypes.func.isRequired,
        inviteConfirm: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.retrieve(decodeURIComponent(this.props.match.params.token));
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const isExistingUser = this.props.match.params.token.startsWith('e-_');

        if (this.props.inviteConfirmed || (isLoggedIn() && !isExistingUser))
            return <Redirect to="/procedures/" />;

        const item = this.props.inviteConfirmed
            ? this.props.inviteConfirmed
            : this.props.retrieved;

        return (
            <Card className={'mt-5'}>
                <Card.Body>
                    <Card.Title>Enter Credentials</Card.Title>

                    {this.props.loading && (
                        <div className="alert alert-info" role="status">
                            Loading...
                        </div>
                    )}
                    {this.props.error && (
                        <div className="alert alert-danger" role="alert">
                            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                            {this.props.error}
                        </div>
                    )}
                    {this.props.retrieveLoading && (
                        <div className="alert alert-info" role="status">
                            Loading...
                        </div>
                    )}
                    {this.props.retrieveError && (
                        <div className="alert alert-danger" role="alert">
                            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                            {this.props.retrieveError}
                        </div>
                    )}

                    {item && (
                        <InviteConfirmForm
                            onSubmit={values =>
                                this.props.inviteConfirm(item, {
                                    ...values,
                                    confirmationToken: this.props.match.params.token
                                })
                            }
                            initialValues={item}
                            isExistingUser={isExistingUser}
                        />
                    )}
                </Card.Body>
            </Card>
        );
    }
}
const mapStateToProps = state => {
    const {
        inviteConfirmed,
        error,
        loading,
        retrieved,
        retrieveError,
        retrieveLoading
    } = state.invite.inviteConfirm;
    return {
        inviteConfirmed,
        error,
        loading,
        retrieved,
        retrieveError,
        retrieveLoading
    };
};

const mapDispatchToProps = dispatch => ({
    retrieve: id => dispatch(retrieve(id)),
    inviteConfirm: (item, values) => dispatch(inviteConfirm(item, values)),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteConfirm);
