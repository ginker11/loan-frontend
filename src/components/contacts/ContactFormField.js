import React from 'react';
import { TextInput, required } from 'react-admin';
import { Grid } from '@material-ui/core';

const CompanyFormField = ({ record }) => {
  return (
    <>
      {/* Empty element wrapper to work around default styling */}
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextInput fullWidth  label = 'First Name' source = 'firstName' validate={[required()]} id = 'firstName2' />                    
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput fullWidth  label = 'Last Name' source = 'lastName' validate={[required()]} id = 'lastName2' />                    
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput fullWidth  label = 'Email' source = 'email' id = 'email2' validate={[required()]}/>                    
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput fullWidth label = 'Street Address' source = 'streetAddress' id = 'streetAddress2' />             
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextInput fullWidth label = 'City' source = 'city' id = 'city2' />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextInput fullWidth label = 'State' source = 'state' id = 'state2'/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextInput fullWidth label = 'Country' source = 'country' id = 'country2'/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput fullWidth label = 'Postal Code' source = 'postalCode' id = 'postalCode2'/>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default CompanyFormField;