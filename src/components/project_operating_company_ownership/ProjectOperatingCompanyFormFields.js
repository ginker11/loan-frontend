import React, {useState, useEffect} from 'react';
import {
  ReferenceInput,
  AutocompleteInput,
  NumberInput,
  TextInput,
  SelectInput,
  required
} from 'react-admin';
import ContactFormField from '../contacts/ContactFormField';
import ModalCreateButton from '../helpers/ModalCreateButton'; 
import { Grid, Divider } from '@material-ui/core';

const ProjectOperatingCompanyFormFields = ({ record }) => {
  
  
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
                      <SelectInput required optionText = {contact => `${contact.firstName}` + ` ` + `${contact.lastName}` }  />
                    </ReferenceInput>
                </Grid>
                <Grid item xs={2} sm={1}>
                    <ModalCreateButton
                        dialogResource="contacts"
                        dialogFormField="contact"
                        dialogTitle="Add a Contact"
                        actionTypeCreate
                    >
                            <ContactFormField />
                    </ModalCreateButton>
                </Grid>
                <Grid item xs = {11} sm = {11}>
                    <TextInput required fullWidth label = 'Ownership Percentage' source = 'ownershipPercentage' />
                </Grid>
            </Grid>
        </Grid>
    </>
  );
};
export default ProjectOperatingCompanyFormFields;