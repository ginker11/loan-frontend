import React, {dispatch} from 'react';
import { SelectInput,  Datagrid, Edit, SimpleForm, 
    ReferenceInput, ReferenceManyField,  DeleteButton,
    TopToolbar, SaveButton, TOGGLE_LIST_ITEM_EXPAND, TextField} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import FieldGuesser from '@api-platform/admin/lib/FieldGuesser';
import { Grid, Typography, Divider } from '@material-ui/core';
import { createForm } from 'final-form';
import ModalCreateButton from '../helpers/ModalCreateButton';
import BorrowerCompanyOwnershipFormField from '../borrower_company_ownership/BorrowerCompanyOwnershipFormField';

const FormAction = ({ basePath, data, redirect, ...props }) => {
 
    return (
        <TopToolbar {...props}>
            <SaveButton submitOnEnter={false} redirect='' {...props} style = {{marginRight: '2rem'}} />
        </TopToolbar>
    )
}
const BorrowerEditPanel = props => {
    const {record, redirectId} = props;
    return (
            <Edit 
                    {...props}
                    /* disable the app title change when shown */
                    title=" "
                    style = {{width: '80%'}}
            >
                { (!record.company) ? 
                (
                    <SimpleForm
                        /* The form must have a name dependent on the record, because by default all forms have the same name */
                        form={createForm({onSubmit: () => {}})}
                        toolbar = {<FormAction {...props}/>}
                    > 
    
                            <ReferenceInput
                                source="contact"
                                reference="contacts"
                                label="Contact"
                                style = {{width: '60%'}}
                                >
                                <SelectInput  optionText = {contact => `${contact.firstName}` + ` ` + `${contact.lastName}` } defaultValue = {record.contact}/>
                            </ReferenceInput>
                   
                    </SimpleForm>
                ) :
                (
                    <SimpleForm
                        /* The form must have a name dependent on the record, because by default all forms have the same name */
                        form={createForm({onSubmit: () => {}})}
                        toolbar={<FormAction {...props}/>}
                    > 
                            <ReferenceInput
                            source="company"
                            reference="companies"
                            label="Company"
                            style = {{width: '60%'}}
                            format = {v => {
                                return v instanceof Object ? v['@id'] : v;
                            }}
                            >
                            <SelectInput  optionText = 'name'  autoSave defaultValue={record.company['name']}/>
                        </ReferenceInput>
                       <Divider style = {{width: '60%', margin: '0.8rem'}}/>
                        <ReferenceManyField label = 'Borrower Company Ownership Percentages' reference = 'borrower_company_ownerships' target = 'borrower'>
                            <Datagrid >
                            <TextField source = 'contact.name' label="Contact" />
                            <FieldGuesser source = 'ownershipPercent' />
                            <DeleteButton redirect={false}/>
                            </Datagrid>
                        </ReferenceManyField>
                        <ModalCreateButton
                                        dialogResource="borrower_company_ownerships"
                                        dialogFormField="borrowerCompanyOwnership"
                                        dialogTitle="Add a Company Borrower Ownership"
                                        dialogMergeFormValues={{ borrower: record.id }}
                                        dialogRedirect={`/projects/${encodeURIComponent(
                                            redirectId
                                        )}/edit_borrowers`}
                                        dialogAddTextLabel="Add a Company Borrower Ownership Percentage"
                                        actionTypeCreate
                                        >
                                            <BorrowerCompanyOwnershipFormField />
                            </ModalCreateButton>
                    </SimpleForm>
                )
                }
            </Edit>
)};

export default BorrowerEditPanel;