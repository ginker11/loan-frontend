import React from 'react';
import { TextInput, NumberInput, ReferenceInput, SelectInput, required, NullableBooleanInput } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';
import ModalCreateButton from '../helpers/ModalCreateButton';
import ContactFormField from '../contacts/ContactFormField';

const DebtServiceRatioFormField = ({ record }) => {
  return (
    <>
      {/* Empty element wrapper to work around default styling */}
        <Grid container spacing={2} alignItems = 'center'>
            <Grid item xs = {12} sm = {6}>
                <NumberInput fullWidth label = 'Year' source = 'year' defaultValue = {new Date().getFullYear()}/>
            </Grid>
            <Grid item xs = {12} sm = {6}>
                <TextInput fullWidth label = 'Ratio' source = 'ratio' />
            </Grid>
        </Grid>
    </>
  );
};
export default DebtServiceRatioFormField;