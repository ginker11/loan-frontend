import React, {useState, useRef} from 'react';
import {
  ReferenceInput,
  AutocompleteInput,
  ReferenceManyField,
  Datagrid,
  FormDataConsumer, 
  TabbedForm,
  FormTab,
} from 'react-admin';

import { Grid } from '@material-ui/core';
import FieldGuesser from '@api-platform/admin/lib/FieldGuesser';



const ContactOptions = (props) => {
  return (
    <>
        <Grid  container direction = 'row' spacing={3}>
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
        </Grid>
    </>
  )
}

const CompanyOptions = (props) => {
  return(
    <>
      <Grid  container direction = 'row' spacing={3}>
          <Grid item xs={12} sm={12}>
            <ReferenceInput
              source="company"
              reference="companies"
              label="Company"
              fullWidth
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
          </Grid>
        </Grid>
        {/* Check fields existence before rendering  */}
          <ReferenceManyField label = 'Company Borrower Ownership Percentage' reference = 'borrower_company_ownerships' target = 'borrowers'>
          <Datagrid>
            <FieldGuesser source = 'contact' />
            <FieldGuesser source = 'ownershipPercent' />
          </Datagrid>
        </ReferenceManyField>
    </>
    )
}




const BorrowerEditFormField = ({ record }) => {
  const editFields = (record.company) ? <CompanyOptions /> : <ContactOptions />;
  return editFields;
}
export default BorrowerEditFormField;