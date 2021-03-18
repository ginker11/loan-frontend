import React, {useState, useEffect} from 'react';
import {FieldGuesser} from "@api-platform/admin";
import {TextInput, AutocompleteInput, NumberInput, Datagrid, Edit, TabbedForm, 
        FormTab, ReferenceInput, ReferenceManyField, DateInput, BooleanInput, DeleteButton,
        NullableBooleanInput, FunctionField, TextField, } from 'react-admin';
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
import ProjectOperatingCompanyFormFields from '../project_operating_company_ownership/ProjectOperatingCompanyFormFields';
import GuarantorFormField from '../guarantors/GuarantorFormField';
import DebtServiceRatioFormField from '../debtServiceRatio/DebtServiceRatioFormField';
import ProjectFinancingSourceSummary from '../project_financing_sources/ProjectFinancingSourceSummary';

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
                            <Grid container direction="row" alignItems="center" spacing={6}>
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
                                    <TextInput fullWidth label = 'Project Street Address' source = 'streetAddress' />
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
                                <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                    <BooleanInput fullWidth label = 'Payment Penalty' source = 'paymentPenalty' />
                                </Grid>
                            </Grid>
                        </div>
                    </>
                </FormTab>
                <FormTab label={'Financing Sources'} path={'edit_financing'}>
                <ReferenceManyField label = 'Project Financing Sources' reference="project_financing_sources" target = 'project'  >
                    <>
                        <Datagrid expand={<PostPanel />}>
                            <TextField source = 'lienPosition.position' label = 'Lien Position'/>
                            <TextField source = 'financingSource.name' label = 'Financing Source'/>
                            <FunctionField label = 'Amount' 
                                render = {record => `$${parseFloat(record.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` } 
                            />
                            <FunctionField label = 'Percentage' 
                                render = {record => record.percentage + '%' } 
                            />
                            <ModalEditButton
                                    dialogResource="project_financing_sources"
                                    dialogFormField="projectFinancingSources"
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
                        <ModalCreateButton
                            dialogResource="project_financing_sources"
                            dialogFormField="projectFinancingSources"
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
                        <ProjectFinancingSourceSummary projectId = {props.id}/>
                    </>
                </ReferenceManyField>
                </FormTab>
                <FormTab label={'O.C Owner(s)'} path = {'edit_oc_owners'}>
                        <ReferenceManyField label = 'Project Operating Company Ownership Percentages' reference = 'project_operating_company_ownerships' target = 'project'>
                            <Datagrid>
                                <FunctionField label = 'Contact' render = {record => `${record.contact.firstName}` + ` ` + `${record.contact.lastName}`} />
                                <FieldGuesser source = 'ownershipPercentage' />
                                <ModalEditButton
                                    dialogResource="project_operating_company_ownerships"
                                    dialogFormField="projectOperatingCompanyOwnership"
                                    dialogTitle="Edit Project Operating Company Ownership"
                                    dialogMergeFormValues={{ project: props.id }}
                                    dialogRedirect={`/projects/${encodeURIComponent(
                                    props.id
                                    )}/edit_oc_owners`}
                                    dialogAddTextLabel="Edit"
                                    actionTypeEdit
                                >
                                    <ProjectOperatingCompanyFormFields />
                                </ModalEditButton>
                                <DeleteButton redirect = {`/projects/${encodeURIComponent(props.id)}/edit_oc_owners`} />
                            </Datagrid>
                        </ReferenceManyField>
                        <ModalCreateButton
                                    dialogResource="project_operating_company_ownerships"
                                    dialogFormField="projectOperatingCompanyOwnership"
                                    dialogTitle="Add a Project Operating Company Ownership"
                                    dialogMergeFormValues={{ project: props.id }}
                                    dialogRedirect={`/projects/${encodeURIComponent(
                                    props.id
                                    )}/edit_oc_owners`}
                                    dialogAddTextLabel="Create"
                                    actionTypeEdit
                                >
                                    <ProjectOperatingCompanyFormFields />
                                </ModalCreateButton>
                </FormTab>
                <FormTab label={'Guarantors'} path = 'edit_guarantors'>
                    <ReferenceManyField label = 'Project Guarantors' reference='guarantors' target = 'project'>
                        <Datagrid>
                            <FunctionField label = 'Contact' render = {record => `${record.contact.firstName}` + ` ` + `${record.contact.lastName}`} />
                            <FieldGuesser source = 'ficoScore' />
                            <FieldGuesser source = 'publicRecordClear' />
                                <ModalEditButton
                                    dialogResource="guarantors"
                                    dialogFormField="guarantor"
                                    dialogTitle="Edit Guarantor"
                                    dialogMergeFormValues={{ project: props.id }}
                                    dialogRedirect={`/projects/${encodeURIComponent(
                                    props.id
                                    )}/edit_guarantors`}
                                    dialogAddTextLabel="Edit"
                                    actionTypeEdit
                                >
                                    <GuarantorFormField/>
                                </ModalEditButton>
                            <DeleteButton redirect = {`/projects/${encodeURIComponent(props.id)}/edit_guarantors`} />
                        </Datagrid>
                    </ReferenceManyField>
                    <ModalCreateButton
                        dialogResource="guarantors"
                        dialogFormField="guarantor"
                        dialogTitle="Add a Guarantor"
                        dialogMergeFormValues={{ project: props.id }}
                        dialogRedirect={`/projects/${encodeURIComponent(
                        props.id
                        )}/edit_guarantors`}
                        dialogAddTextLabel="Create"
                        actionTypeEdit
                    >
                        <GuarantorFormField/>
                    </ModalCreateButton>
                </FormTab>
                <FormTab label={'Borrowers'} path = {'edit_borrowers'}>
                    <ReferenceManyField label = 'Project Borrowers' reference="borrowers" target = 'project'>
                        <Datagrid expand = {<BorrowerEditPanel redirectId={props.id}/>}>
                            <TextField source = 'company.name' label = 'Company' />
                            <FunctionField label = 'Contact' render = 
                                {record => record.contact ? `${record.contact.firstName}` + ` ` + `${record.contact.lastName}`
                                    : ''
                                } 
                            /> 
                            <FunctionField label = 'Borrower Company Ownerships' render = {
                                record => (record.borrowerCompanyOwnership.length != 0) ? record.borrowerCompanyOwnership.forEach((bc, index) => (
                                    `${bc.contact.firstName}` + ` ` + `${bc.contact.lastName} + `  |  `${bc.ownershipPercentage}%`
                                    ))
                                : ''
                            } />
                            {/* <ModalEditButton
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
                                </ModalEditButton> */}
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
                <FormTab label = 'Debt Service Ratio' path = {'edit_debt_service_ratios'}>
                    <ReferenceManyField label = 'Project Debt Service Ratios' reference = 'debt_service_ratios' target = 'project'>
                        <Datagrid>
                            <TextField source = 'year' />
                            <FieldGuesser source = 'ratio' />
                            <FieldGuesser label = 'Last Updated' source = 'debtServiceRatioUpdatedOn' />
                            <ModalEditButton
                                    dialogResource="debt_service_ratios"
                                    dialogFormField="debtServiceRatio"
                                    dialogTitle="Edit Debt Service Ratio"
                                    dialogMergeFormValues={{ project: props.id }}
                                    dialogRedirect={`/projects/${encodeURIComponent(
                                    props.id
                                    )}/edit_debt_service_ratios`}
                                    dialogAddTextLabel="Edit"
                                    actionTypeEdit
                                >
                                    <DebtServiceRatioFormField />
                                </ModalEditButton>
                            <DeleteButton redirect = {`/projects/${encodeURIComponent(props.id)}/edit_debt_service_ratios`} />
                        </Datagrid>
                    </ReferenceManyField>
                    <ModalCreateButton
                        dialogResource="debt_service_ratios"
                        dialogFormField="debtServiceRatios"
                        dialogTitle="Create a Debt Service Ratio"
                        dialogMergeFormValues={{ project: props.id }}
                        dialogRedirect={`/projects/${encodeURIComponent(
                        props.id
                        )}/edit_debt_service_ratios`}
                        dialogAddTextLabel="Create"
                        actionTypeEdit
                    >
                        <DebtServiceRatioFormField />
                    </ModalCreateButton>
                </FormTab>
                <FormTab label = 'Additional Info' source = 'additional_info'>
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