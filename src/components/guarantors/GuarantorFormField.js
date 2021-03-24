import React from 'react';
import { TextInput, NumberInput, ReferenceInput, SelectInput, required, NullableBooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';
import ModalCreateButton from '../helpers/ModalCreateButton';
import ContactFormField from '../contacts/ContactFormField';

const GuarantorFormField = ({ record }) => {
  return (
    <>
      {/* Empty element wrapper to work around default styling */}
        <Grid container spacing={2} alignItems = 'center'>
            <Grid item xs = {12}>
                <Grid container spacing = {0} justify = 'center' alignItems = 'center'>
                    <Grid item xs={11}>
                        <ReferenceInput
                        source="contact"
                        reference="contacts"
                        label="Contact"
                        allowEmpty
                        fullWidth
                        format={v => {
                            return v instanceof Object ? v['@id'] : v;
                        }}
                        >
                        <SelectInput  optionText = {contact => `${contact.firstName}` + ` ` + `${contact.lastName}` } validate={[required()]} />
                        </ReferenceInput>
                    </Grid>
                    <Grid item xs={1}>
                        <ModalCreateButton
                            dialogResource="contacts"
                            dialogFormField="contact"
                            dialogTitle="Add a Contact"
                            actionTypeCreate
                        >
                                <ContactFormField />
                        </ModalCreateButton>
                </Grid>
            </Grid>
            
            </Grid>
             <Grid item xs = {11}>
                <TextInput multiline fullWidth label = 'Guarantor Description' source = 'guarantorDescription' />
            </Grid>
            <Grid item xs = {12} sm = {6}>
                <NumberInput fullWidth label = 'Fico Score' source = 'ficoScore' />
            </Grid>
            <Grid item xs = {12} sm = {5}>
                <NullableBooleanInput style = {{width: '100%'}} label = 'Public Record Clear?' source = 'publicRecordClear' />
            </Grid>
           
        </Grid>
    </>
  );
};
export default GuarantorFormField;