import React, {useState, useRef} from 'react';
import {
  ReferenceInput,
  AutocompleteInput
} from 'react-admin';
import CompanyFormField from '../companies/CompanyFormField';
import ModalCreateButton from '../helpers/ModalCreateButton'; 
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  iconButton: {
    width: '8rem',
    height: '8rem',
    '& svg': {
      fontSize: '4.5rem'
    },
    marginBottom: '2rem'
  }
}));

const CompanyBorrowerFormField = ({ record }) => {

  return (
    <>
      <Grid  container direction = 'row' justify = 'center' alignItems = 'center' spacing={3}>
        <Grid item xs = {12}>
          <Typography variant = 'subtitle1' color = 'textSecondary' style = {{marginBottom: '1rem'}}>
              Create a new company borrower
         </Typography>
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={0}>
        <Grid item xs={10} sm={10}>
            <ReferenceInput
                source="company"
                reference="companies"
                label="Company"
                fullWidth
                format={v => {
                    return v instanceof Object ? v['@id'] : v;
                }}
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
  )
}
export default CompanyBorrowerFormField;