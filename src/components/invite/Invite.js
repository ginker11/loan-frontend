import React, { Component } from 'react';
import { connect } from 'react-redux';
import { /*Link,*/ Redirect } from 'react-router-dom';
import { VersionLink as Link } from '../VersionLink';
import PropTypes from 'prop-types';
import InviteForm from './InviteForm';
import { invite, reset } from '../actions/invite/invite';

import Card from 'react-bootstrap/Card';

class Invite extends Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        invited: PropTypes.object,
        invite: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
    };

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        if (this.props.invited) return <Redirect to="/users/" />;

        return (
            <div className="invite-user-wrapper">
                <div className={'page-actions-wrapper'}>
                    <div className={'page-actions  invite-user-action'}>
                        <Link to="/users/" className="btn btn-primary">
                            Back to list
                        </Link>
                    </div>
                </div>
                <Card
                    className={
                        'mt-5 col-lg-4 col-md-6 col-sm-8 offset-lg-4 offset-md-3 offset-sm-2'
                    }
                >
                    <Card.Body>
                        <Card.Title>Invite Someone to Lista</Card.Title>

                        {this.props.loading && (
                            <div className="alert alert-info" role="status">
                                Loading...
                            </div>
                        )}
                        {this.props.error && (
                            <div className="alert alert-danger" role="alert">
                <span
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                />{' '}
                                {this.props.error}
                            </div>
                        )}

                        <InviteForm onSubmit={this.props.invite} values={this.props.item} />
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { invited, error, loading } = state.invite.invite;
    return { invited, error, loading };
};

const mapDispatchToProps = dispatch => ({
    invite: values => dispatch(invite(values)),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
