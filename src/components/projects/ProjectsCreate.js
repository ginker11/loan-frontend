import React from 'react';
import {TextInput, AutocompleteInput, NumberInput, Datagrid, ReferenceInput, DateInput, BooleanInput, required, 
    NullableBooleanInput, Create, TabbedForm, FormTab} from 'react-admin';
import CompanyFormField from '../companies/CompanyFormField';
import ModalCreateButton from '../helpers/ModalCreateButton';
import {EditActions} from '../actions/EditActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '90%',
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    gridItem: {
        width: '15%'
    },
    nestedGridItem: {
        width: '95%'
    },
    addButton: {
        width: '5%'
    },
    selectItem: {
        width: '90%'
    }
  }));



export const ProjectsCreate = props => {
    const classes = useStyles();
    return(
        <Create  actions = {<EditActions title = 'Create a new Project'/>} {...props}>
            <TabbedForm>
                <FormTab label = 'General Info'>
                    <>
                    <div className = {classes.root}>
                        <Grid container direction="row" alignItems="center" spacing={6}>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                 <Grid container direction = 'row' alignItems="center" spacing = {0}>
                                    <Grid item className = {classes.nestedGridItem}>
                                        <ReferenceInput source='operatingCompany' reference='companies' label='Operating Company' 
                                            filterToQuery={(searchText) => ({ title: searchText })} validate={[required()]}>
                                                <AutocompleteInput fullWidth optionText='name'/>
                                        </ReferenceInput>
                                    </Grid>
                                    <Grid item className = {classes.addButton}>
                                    <ModalCreateButton
                                        dialogResource="companies"
                                        dialogFormField="operatingCompany"
                                        dialogTitle="Add a Company"
                                        actionTypeCreate
                                        >
                                            <CompanyFormField />
                                    </ModalCreateButton>
                                    </Grid>
                                </Grid>
                            </Grid>                           
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Project Street Address' source = 'streetAddress' validate={[required()]} />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'City' source = 'city' validate={[required()]} />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'State' source = 'state' validate={[required()]}/>
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Country' source = 'country' validate={[required()]}/>
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Postal Code' source = 'postalCode' validate={[required()]} />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Purchase Land and Building' source = 'purchaseLandAndBuilding' validate={[required()]} />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Tenant Improvement' source = 'tenantImprovement' validate={[required()]} />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Eligible Fees' source = 'eligibleFees' validate={[required()]}/>
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <BooleanInput fullWidth label = 'Payment Penalty' source = 'paymentPenalty' defaultValue = {true}/>
                            </Grid>
                        </Grid>
                    </div>
                    </>  
                </FormTab>
                <FormTab label = 'Additional Information' path = 'Additional_Information'>
                    <>
                        <div className = {classes.root}>
                            <Grid container direction="row" alignItems="center" spacing={6}>
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <TextInput multiline fullWidth label = 'General Description' source = 'generalDescription' />
                                </Grid>
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <TextInput multiline fullWidth label = 'Financial Description' source = 'financialDescription' />
                                </Grid> 
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <TextInput multiline fullWidth label = 'Public Record Report' source = 'publicRecordReport' />
                                </Grid>
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <DateInput fullWidth label = 'Period Ending Date' source = 'periodEndingDate' />
                                </Grid> 
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <NumberInput fullWidth label = 'Cash on Hand' source = 'cashOnHand' />
                                </Grid> 
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <NumberInput fullWidth label = 'Working Capital' source = 'workingCapital' />
                                </Grid> 
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <NumberInput fullWidth label = 'Liquidity Ratio' source = 'liquidityRatio' />
                                </Grid>
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <TextInput multiline fullWidth label = 'Liquidity Strength' source = 'liquidityStrength' />
                                </Grid>
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <TextInput multiline fullWidth label = 'Bank Debts' source = 'bankDebts' />
                                </Grid>
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <NumberInput fullWidth label = 'Debt of Worth' source = 'debtOfWorth'/>
                                </Grid>
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <TextInput multiline fullWidth label = 'Sale Increases' source = 'saleIncreases' />
                                </Grid>
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <NullableBooleanInput style = {{width: '100%'}} label = 'SBA Appraisal Approval' source = 'sbaAppraisalApproval' />
                                </Grid>
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <NullableBooleanInput  style = {{width: '100%'}} label = 'Environmental Approval' source = 'environmentalApproval' />
                                </Grid>
                            </Grid>
                        </div>
                    </>
                </FormTab>
            </TabbedForm>
        </Create>
    )
}