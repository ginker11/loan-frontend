import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import AsyncSelect from 'react-select/async';

import { isAdmin } from '../utils/auth';

class InviteForm extends Component {
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
                    htmlFor={`invite_${data.input.name}`}
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
                    id={`invite_${data.input.name}`}
                />
                {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
            </div>
        );
    };

    renderSelectField = data => {
        return (
            <div className={`form-group invite-${data.input.name}-wrapper`}>
                <AsyncSelect
                    {...data.input}
                    step={data.step}
                    required={data.required}
                    placeholder={data.placeholder}
                    id={`invite_${data.input.name}`}
                    className={`invite-${data.input.name}`}
                    classNamePrefix={`invite-${data.input.name}`}
                    defaultOptions
                    onBlur={event => {
                        event.preventDefault(); // https://stackoverflow.com/questions/48419984/how-to-have-searchable-dropdown-in-redux-form
                    }}
                    onChange={(newValue, actionMeta) => {
                        data.input.onChange(newValue, actionMeta);
                    }}
                    isMulti={false}
                    isClearable={true}
                    loadOptions={data.loadOptions}
                    // setting the value explicitly so that it will appear on page load
                    value={
                        data.input.value === ''
                            ? undefined
                            : //: [{ label: data.input.value, value: data.input.value }]
                            data.input.value
                    }
                    getOptionLabel={this.getOptionLabel}
                    getOptionValue={this.getOptionValue}
                />
            </div>
        );
    };

    getOptionLabel = option => {
        // seems like nested object values due to renderSelectField
        if (
            option.label &&
            Array.isArray(option.label) &&
            option.label[0] &&
            option.label[0].label
        ) {
            return option.label[0].label;
        }
        if (option.label && option.label.label) {
            return option.label.label;
        }

        return option.label;
    };

    getOptionValue = option => {
        // seems like nested object values due to renderSelectField
        if (
            option.value &&
            Array.isArray(option.value) &&
            option.value[0] &&
            option.value[0].value
        ) {
            return option.value[0].value;
        }
        if (option.value && option.value.value) {
            return option.value.value;
        }

        return option.value;
    };

    getRoleOptions = inputValue => {
        let roles = [
            {
                label: 'as user (can only use existing procedures)',
                value: 'user'
            }
        ];

        if (isAdmin()) {
            roles = [
                {
                    label: 'as user (can only use existing procedures)',
                    value: 'user'
                },

                {
                    label: 'as administrator (can do all, including delete)',
                    value: 'admin'
                }
            ];
        }

        return new Promise(dispatch => {
            return dispatch(roles);
        });
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Field
                    component={this.renderField}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="janedoe@example.com"
                    required={true}
                />
                <Field
                    component={this.renderSelectField}
                    name="asRole"
                    type="select"
                    placeholder="Role"
                    loadOptions={this.getRoleOptions}
                />

                <button type="submit" className="btn btn-block btn-primary mb-3">
                    Invite
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'invite',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(InviteForm);
