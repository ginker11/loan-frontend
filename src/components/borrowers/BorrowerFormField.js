import React from 'react';
import {
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin';
import ContactFormField from '../contacts/ContactFormField';
import CompanyFormField from '../companies/CompanyFormField';
import ModalCreateButton from '../helpers/ModalCreateButton'; 
import { Grid, Typography } from '@material-ui/core';

const BorrowerFormField = ({ record }) => {
  return (
    <>
      {/* Empty element wrapper to work around default styling */}
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2}>
          <Typography variant="subtitle1" gutterBottom>
            Select a Contact or Company
          </Typography>
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={0}>
          <Grid item xs={10} sm={10}>
            <ReferenceInput
              source="contact"
              reference="contacts"
              label="Contact"
            //   format={v => {
            //     return v instanceof Object ? v['@id'] : v;
            //   }}
              fullWidth
            >
              <AutocompleteInput optionText = {contact => `${contact.firstName}` + ' ' + `${contact.lastName}` }  />
            </ReferenceInput>
          </Grid>
          <Grid item xs={2} sm={2}>
            <ModalCreateButton
                dialogResource="contacts"
                dialogFormField="contacts"
                dialogTitle="Add a Contact"
                actionTypeCreate
                >
                    <ContactFormField />
            </ModalCreateButton>
          </Grid>
          <Grid item xs={10} sm={10}>
            <ReferenceInput
              source="company"
              reference="companies"
              label="Company"
              fullWidth
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
          </Grid>
          <Grid item xs={2} sm={2}>
            <ModalCreateButton
                dialogResource="companies"
                dialogFormField="companies"
                dialogTitle="Add a Company"
                actionTypeCreate
                >
                    <CompanyFormField />
            </ModalCreateButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default BorrowerFormField;