import React from 'react';
import {TextInput, Edit, SimpleForm, SelectInput, ReferenceInput} from 'react-admin';
import { createForm } from 'final-form';

const BorrowerCompanyOwnershipEdit = props => (
    <Edit 
        {...props}
        /* disable the app title change when shown */
        title=" "
    >
        <SimpleForm
            /* The form must have a name dependent on the record, because by default all forms have the same name */
            form={createForm({onSubmit: () => {}})}
        >   
            <ReferenceInput
                    source="contact"
                    reference="contacts"
                    label="Contact"
                    allowEmpty
                    fullWidth
                    >
                    <SelectInput  fullWidth optionText = {contact => `${contact.firstName}` + ` ` + `${contact.lastName}` }  />
            </ReferenceInput>
            <TextInput source="ownershipPercent" />
        </SimpleForm>
    </Edit>
);

export default BorrowerCompanyOwnershipEdit;