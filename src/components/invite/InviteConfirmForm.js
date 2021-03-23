import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class InviteConfirmForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string
    };

    renderField = data => {
        data.input.className = 'form-control';

        const isInvalid = data.meta.touched && !!data.meta.error;
        if (isInvalid) {
            data.input.className += ' is-invalid';
            data.input['aria-invalid'] = true;
        }

        if (this.props.error && data.meta.touched && !data.meta.error) {
            data.input.className += ' is-valid';
        }

        return (
            <div className={`form-group`}>
                <label
                    htmlFor={`inviteConfirm_${data.input.name}`}
                    className="form-control-label"
                >
                    {data.label || data.input.name}
                </label>
                <input
                    {...data.input}
                    type={data.type}
                    step={data.step}
                    required={data.required}
                    placeholder={data.placeholder}
                    id={`inviteConfirm_${data.input.name}`}
                    readOnly={data.readOnly || false}
                />
                {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
            </div>
        );
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Field
                    component={this.renderField}
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="e.g. Jane Doe"
                    required={true}
                    readOnly={!!this.props.isExistingUser}
                />
                {/*
        <Field
          component={this.renderField}
          name="company"
          label="Company"
          type="text"
          placeholder="e.g. Acme Corp."
        />
        <Field
          component={this.renderField}
          name="email"
          label="Email"
          type="email"
          placeholder="janedoe@example.com"
          required={true}
        />
        */}
                <Field
                    component={this.renderField}
                    name="plainPassword"
                    label="Password"
                    type="password"
                    placeholder=""
                    required={true}
                />

                <button type="submit" className="btn btn-block btn-secondary mb-3">
                    {!!this.props.isExistingUser
                        ? 'Accept Invitation'
                        : 'Complete Registration'}
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'inviteConfirm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(InviteConfirmForm);
