import React from 'react';
import {
  ReferenceInput,
  AutocompleteInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DeleteButton
} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import FieldGuesser from '@api-platform/admin/lib/FieldGuesser';
import BorrowerCompanyOwnershipFormField from '../borrower_company_ownership/BorrowerCompanyOwnershipFormField';
import ModalCreateButton from '../helpers/ModalCreateButton';
import BorrowerCompanyOwnershipEdit from '../borrower_company_ownership/BorrowerCompanyOwnershipEdit';


const ContactOptions = (record) => {
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
              <AutocompleteInput  optionText = {contact => `${contact.firstName}` + ` ` + `${contact.lastName}` }  />
            </ReferenceInput>
          </Grid>
        </Grid>
    </>
  )
}

const CompanyOptions = (record, id) => {
  const recordId = record.record.id;
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
            <Grid item xs={12} sm={12}>
              <Grid container direction = 'row' spacing={0}>
                <Grid item xs={12} sm={12}>
                  <Typography variant = 'subtitle1' gutterBottom>
                    Company Borrower Ownership Percentages
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <ReferenceManyField reference = 'borrower_company_ownerships' target = 'borrowers' basePath = '/borrower_company_ownerships'>
                    <Datagrid expand = {<BorrowerCompanyOwnershipEdit />}>
                      <FieldGuesser source = 'contact' />
                      <TextField source = 'ownershipPercent' />
                      <DeleteButton redirect = {false} />
                    </Datagrid>
                  </ReferenceManyField>
                  <ModalCreateButton
                                dialogResource="borrower_company_ownerships"
                                dialogFormField="borrower_company_ownerships"
                                dialogTitle="Add a Company Borrower Ownership"
                                dialogMergeFormValues={{ borrower: recordId }}
                                // dialogRedirect={`/projects/${encodeURIComponent(
                                //     record.id
                                // )}/edit_borrowers`}
                                dialogAddTextLabel="Add a Company Borrower"
                                actionTypeCreate
                                >
                                    <BorrowerCompanyOwnershipFormField />
                  </ModalCreateButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
    </>
    )
}




const BorrowerEditFormField = ({ record, redirectId }) => {
  const editFields = (record.company) ? <CompanyOptions record = {record} id = {redirectId}/> : <ContactOptions />;
  return editFields;
}
export default BorrowerEditFormField;