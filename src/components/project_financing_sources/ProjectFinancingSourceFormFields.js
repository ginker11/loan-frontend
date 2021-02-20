import React, {useState, useEffect} from 'react';
import {
  ReferenceInput,
  AutocompleteInput,
  NumberInput,
  TextInput,
  SelectInput,
  FormDataConsumer,
  Loading,
  Error,
  useDataProvider,
  useInput
} from 'react-admin';
import { useForm, useFormState } from 'react-final-form';
import FinancingSourceFormField from '../financing_sources/FinancingSourceFormField';
import ModalCreateButton from '../helpers/ModalCreateButton'; 
import { Grid, Typography } from '@material-ui/core';

const ProjectFinancingSourceFormFields = ({ record, projectId }) => {
  const dataProvider = useDataProvider();
  const [totalFinancingAmount, setFinancingAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const {change} = useForm();
  const { values : { amount }} = useFormState({ subscription: { values: true } });

 

  useEffect(() => {
    dataProvider.getOne('projects', { id: projectId })
        .then(({ data }) => {
            let financingSum = parseFloat(data["purchaseLandAndBuilding"]) + parseFloat(data["tenantImprovement"]) + parseFloat(data["eligibleFees"]);
            setFinancingAmount(financingSum)
            setLoading(false);
        })
        .catch(error => {
          console.log(error);
            setError(error);
            setLoading(false);
        })
}, []);

useEffect(() => {
    change('percentage', ((amount / totalFinancingAmount) * 100).toFixed(2));
  }, [change, amount]);

  if (loading) return <Loading />;
  // if (error) return <Error />;

  
  return (
    <>
      {/* Empty element wrapper to work around default styling */}
      <Grid container  justify="center" alignItems="center"  spacing={2}>
        <Grid container item xs={12} spacing={2}>
          <Typography variant="subtitle1" gutterBottom>
            Create a Project Financing Source
          </Typography>
        </Grid>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs = {12}> 
            <Grid container direction = 'row' alignItems="center"  spacing = {0}>
              <Grid item xs = {11}>
                  <ReferenceInput
                    source="financingSource"
                    reference="financing_sources"
                    label="Financing Source"
                    fullWidth
                  >
                    <AutocompleteInput optionText = 'name' />
                  </ReferenceInput>
              </Grid>
              <Grid item xs = {1} >
                  <ModalCreateButton
                    dialogResource="financing_sources"
                    dialogFormField="financing_sources"
                    dialogTitle="Add a Financing Source"
                    actionTypeCreate
                  >
                          <FinancingSourceFormField />
                  </ModalCreateButton>
              </Grid>            
          </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReferenceInput
              source="lienPosition"
              reference="lien_positions"
              label="Lien Position"
              fullWidth
            >
              <SelectInput optionText = 'position' />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextInput fullWidth label = 'Amount' source = 'amount' />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextInput fullWidth label = 'Principal and Interest Payment' source = 'principalAndInterestPayment'/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <NumberInput fullWidth label = 'Amortization' source = 'amortization'/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextInput fullWidth label = 'Rate' source = 'rate'/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <NumberInput fullWidth label = 'Term' source = 'term'/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextInput disabled  fullWidth label = 'Percentage' source = 'percentage' />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default ProjectFinancingSourceFormFields;