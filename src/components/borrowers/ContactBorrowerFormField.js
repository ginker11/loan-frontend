import React from 'react';
import {
  ReferenceInput,
  AutocompleteInput
} from 'react-admin';
import ContactFormField from '../contacts/ContactFormField';
import ModalCreateButton from '../helpers/ModalCreateButton'; 
import { Grid, Typography } from '@material-ui/core';

const ContactBorrowerFormField = ({ record }) => {
  return (
    <>
      <Grid  container direction = 'row' justify = 'center' alignItems = 'center' spacing={3}>
        <Grid item xs = {12}>
          <Typography variant = 'subtitle1' color = 'textSecondary' style = {{marginBottom: '1rem'}}>
              Create a new contact borrower
         </Typography>
        </Grid>
        
        <Grid container justify="center" alignItems="center" spacing={0}>
        <Grid item xs={10} sm={10}>
            <ReferenceInput
              source="contact"
              reference="contacts"
              label="Contact"
              fullWidth
            >
              <AutocompleteInput  optionText = {contact => `${contact.firstName}` + ' ' + `${contact.lastName}` }  />
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
        </Grid>
    </Grid>
    </>
  )
}
export default ContactBorrowerFormField;