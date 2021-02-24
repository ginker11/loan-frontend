import React from 'react';
import { TextInput, ReferenceInput, SelectInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';
import ModalCreateButton from '../helpers/ModalCreateButton';
import ContactFormField from '../contacts/ContactFormField';
const BorrowerCompanyOwnershipFormField = ({ record }) => {
  return (
    <>
      {/* Empty element wrapper to work around default styling */}
      <Grid container spacing={2}>
        <Grid container spacing={2} justify = 'center' alignItems = 'center'>
            <Grid item xs={10} sm={10}>
                <ReferenceInput
                source="contact"
                reference="contacts"
                label="Contact"
                allowEmpty
                fullWidth
                >
                <SelectInput  optionText = {contact => `${contact.firstName}` + ` ` + `${contact.lastName}` }  />
                </ReferenceInput>
            </Grid>
            <Grid item xs={2} sm={1}>
                <ModalCreateButton
                    dialogResource="contacts"
                    dialogFormField="contacts"
                    dialogTitle="Add a Contact"
                    actionTypeCreate
                >
                        <ContactFormField />
                </ModalCreateButton>
            </Grid>
            <Grid item xs = {11} sm = {11}>
                <TextInput fullWidth label = 'Ownership Percentage' source = 'ownershipPercent' />
            </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default BorrowerCompanyOwnershipFormField;