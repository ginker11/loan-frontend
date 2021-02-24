import React from 'react';
import {FieldGuesser} from "@api-platform/admin";
import {TextInput, AutocompleteInput, NumberInput, Datagrid, Edit, TabbedForm, 
        FormTab, ReferenceInput, ReferenceManyField, DateInput, DeleteButton,
        NullableBooleanInput, FunctionField} from 'react-admin';
import CompanyFormField from '../companies/CompanyFormField';
import BorrowerEditFormField from '../borrowers/BorrowerEditFormField';
// import CompanyBorrowerFormField from '../borrowers/CompanyBorrowerFormField';
// import ContactBorrowerFormField from '../borrowers/ContactBorrowerFormField';
import BorrowerFormField from '../borrowers/BorrowerFormField';
import BorrowerEditPanel from '../borrowers/BorrowerEditPanel';
import ProjectFinancingSourceFormFields from '../project_financing_sources/ProjectFinancingSourceFormFields';
import PostPanel from '../project_financing_sources/ProjectFinancingSourcePanel';
import ModalCreateButton from '../helpers/ModalCreateButton';
import Divider from '@material-ui/core/Divider';
import {EditActions} from '../actions/EditActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ModalEditButton from '../helpers/ModalEditButton';

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

const ProjectTitle = ({record}) => {
    return 'Edit - Project'
}


export const ProjectsEdit = props => {

    const classes = useStyles();
    return(
        <Edit {...props} actions = {<EditActions title = {<ProjectTitle />} />} >
        <TabbedForm>
            <FormTab label={'General Info'}>
                <>
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
                            <Grid item xs = {12} sm = {12} lg = {12}>
                                <Divider variant = 'middle' />
                            </Grid>
                        </Grid>
                    </div>
                </>
            </FormTab>
            <FormTab label={'Financing Sources'} path={'edit_financing'}>
            <ReferenceManyField label = 'Project Financing Sources' reference="project_financing_sources" target = 'project'  >
                    <Datagrid expand={<PostPanel />} >
                        <FieldGuesser source = 'lienPosition'/>
                        <FieldGuesser source = 'financingSource'/>
                        <FunctionField label = 'Amount' 
                            render = {record => `$${parseFloat(record.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` } 
                        />
                        <FunctionField label = 'Percentage' 
                            render = {record => record.percentage + '%' } 
                        />
                        <ModalEditButton
                                dialogResource="project_financing_sources"
                                dialogFormField="project_financing_sources"
                                dialogTitle="Edit Project Financing Source"
                                dialogMergeFormValues={{ project: props.id }}
                                dialogRedirect={`/projects/${encodeURIComponent(
                                props.id
                                )}/edit_financing`}
                                dialogAddTextLabel="Edit"
                                actionTypeEdit
                            >
                                <ProjectFinancingSourceFormFields projectId = {props.id} />
                        </ModalEditButton>
                        <DeleteButton redirect = {`/projects/${encodeURIComponent(props.id)}/edit_financing`} />
                    </Datagrid>
                </ReferenceManyField>
                <ModalCreateButton
                    dialogResource="project_financing_sources"
                    dialogFormField="project_financing_sources"
                    dialogTitle="Add a Financing Source"
                    dialogMergeFormValues={{ project: props.id }}
                    dialogRedirect={`/projects/${encodeURIComponent(
                        props.id
                    )}/edit_financing`}
                    dialogAddTextLabel="Add a Financing Source"
                    actionTypeEdit
                    >
                        <ProjectFinancingSourceFormFields  projectId = {props.id}  />
                    </ModalCreateButton>
            </FormTab>
            <FormTab label={'Project Borrowers'} path = {'edit_borrowers'}>
                <ReferenceManyField label = 'Project Borrowers' reference="borrowers" target = 'project'>
                    <Datagrid expand = {<BorrowerEditPanel />}>
                        <FieldGuesser source = 'company'/>
                        <FieldGuesser source = 'contact'/> 
                        <FieldGuesser source = 'borrowerCompanyOwnership' />
                        <ModalEditButton
                                dialogResource="borrowers"
                                dialogFormField="borrowers"
                                dialogTitle="Edit Borrower"
                                dialogMergeFormValues={{ project: props.id }}
                                dialogRedirect={`/projects/${encodeURIComponent(
                                props.id
                                )}/edit_borrowers`}
                                dialogAddTextLabel="Edit"
                                actionTypeEdit
                            >
                                <BorrowerEditFormField redirectId = {props.id}/>
                            </ModalEditButton>
                            <DeleteButton redirect = {`/projects/${encodeURIComponent(props.id)}/edit_borrowers`} />
                    </Datagrid>
                </ReferenceManyField>
                <ModalCreateButton
                                dialogResource="borrowers"
                                dialogFormField="borrowers"
                                dialogTitle="Add a Company Borrower"
                                dialogMergeFormValues={{ project: props.id }}
                                dialogRedirect={`/projects/${encodeURIComponent(
                                    props.id
                                )}/edit_borrowers`}
                                dialogAddTextLabel="Add a Borrower"
                                actionTypeEdit
                                >
                                    <BorrowerFormField />
                </ModalCreateButton>
                {/* <div style = {{width : '40%'}}>
                    <Grid container direction = 'col'>
                        <Grid item xs = {6}>
                            <ModalCreateButton
                                dialogResource="borrowers"
                                dialogFormField="borrowers"
                                dialogTitle="Add a Company Borrower"
                                dialogMergeFormValues={{ project: props.id }}
                                dialogRedirect={`/projects/${encodeURIComponent(
                                    props.id
                                )}/edit_borrowers`}
                                dialogAddTextLabel="Add a Company Borrower"
                                actionTypeEdit
                                >
                                    <CompanyBorrowerFormField />
                                </ModalCreateButton>
                        </Grid>
                        <Grid item xs = {6}>
                            <ModalCreateButton
                                dialogResource="borrowers"
                                dialogFormField="borrowers"
                                dialogTitle="Add a Contact Borrower"
                                dialogMergeFormValues={{ project: props.id }}
                                dialogRedirect={`/projects/${encodeURIComponent(
                                    props.id
                                )}/edit_borrowers`}
                                dialogAddTextLabel="Add a Contact Borrower"
                                actionTypeEdit
                                >
                                    <ContactBorrowerFormField />
                                </ModalCreateButton>
                        </Grid>
                    </Grid>
                </div> */}
                
                    
            </FormTab>
            <FormTab label = 'Additional Information' source = 'AdditionalInformation'>
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
                    </FormTab>
            </TabbedForm>
        </Edit>
    )
}