import React from 'react';
import {CreateGuesser} from "@api-platform/admin";
import {TextInput, AutocompleteInput, NumberInput, ReferenceInput, DateInput, NullableBooleanInput} from 'react-admin';
import CompanyQuickCreateButton from '../companies/CompanyQuickCreateButton';
import {EditActions} from '../actions/EditActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    gridItem: {
        width: '15%'
    },
    nestedGridItem: {
        width: '93%'
    },
    addButton: {
        width: '5%'
    }
  }));

const ProjectTitle = ({record}) => {
    return 'Create a new Project'
}

export const ProjectsCreate = props => {

    const classes = useStyles();
    return(
        <CreateGuesser title = {<ProjectTitle />} actions = {<EditActions />} {...props}>
                    <div className = {classes.root}>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={6}>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                 <Grid container direction = 'row' alignItems="center" spacing = {0}>
                                    <Grid item className = {classes.nestedGridItem}>
                                        <ReferenceInput source='operatingCompany' reference='companies' label='Operating Company' 
                                            filterToQuery={(searchText) => ({ title: searchText })}>
                                                <AutocompleteInput fullWidth optionText='name'/>
                                        </ReferenceInput>
                                    </Grid>
                                    <Grid item className = {classes.addButton}>
                                            <CompanyQuickCreateButton />
                                    </Grid>
                                </Grid>
                            </Grid>                           
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Street Address' source = 'streetAddress' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'City' source = 'city' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'State' source = 'state' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Country' source = 'country' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Postal Code' source = 'postalCode' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Purchase Land and Building' source = 'purchaseLandAndBuilding' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Tenant Improvement' source = 'tenantImprovement' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Eligible Fees' source = 'eligibleFees' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {6}>
                                 <Grid container direction = 'row' alignItems="center" spacing = {0}>
                                    <Grid item className = {classes.nestedGridItem}>
                                        <ReferenceInput source='borrower' reference='borrowers' label='Borrower' 
                                            filterToQuery={(searchText) => ({ title: searchText })}>
                                                <AutocompleteInput fullWidth optionText='contact'/>
                                        </ReferenceInput>
                                    </Grid>
                                    <Grid item className = {classes.addButton}>
                                            {/* <BorrowerQuickCreateButton /> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {6}>
                                 <Grid container direction = 'row' alignItems="center" spacing = {0}>
                                    <Grid item className = {classes.nestedGridItem}>
                                        <ReferenceInput source='projectOperatingCompanyOwnership' reference='project_operating_company_ownerships' label='Project Operating Company Ownership' 
                                            filterToQuery={(searchText) => ({ title: searchText })}>
                                                <AutocompleteInput fullWidth optionText='contact'/>
                                        </ReferenceInput>
                                    </Grid>
                                    <Grid item className = {classes.addButton}>
                                            {/* <POCOQuickCreateButton /> */}
                                    </Grid>
                                </Grid>
                            </Grid>
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
                                <NullableBooleanInput fullWidth label = 'SBA Appraisal Approval' source = 'sbaAppraisalApproval' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <NullableBooleanInput fullWidth label = 'Environmental Approval' source = 'environmentalApproval' />
                            </Grid>
                            
                        </Grid>
                    </div>
        </CreateGuesser>
    )
}