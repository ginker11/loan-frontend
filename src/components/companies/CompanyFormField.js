import React from 'react';
import { TextInput, required } from 'react-admin';
import { Grid, Typography } from '@material-ui/core';

const CompanyFormField = ({ record }) => {
  return (
    <>
      {/* Empty element wrapper to work around default styling */}
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2}>
          <Typography variant="subtitle1" gutterBottom>
            Company
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextInput fullWidth  label = 'Company Name' source = 'name' id = 'companyName2' validate = {[required()]}/>                    
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