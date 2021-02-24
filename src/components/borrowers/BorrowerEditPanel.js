import React, {dispatch} from 'react';
import { SelectInput,  Datagrid, Edit, SimpleForm, 
    ReferenceInput, ReferenceManyField,  DeleteButton,
    TopToolbar, SaveButton, TOGGLE_LIST_ITEM_EXPAND} from 'react-admin';
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
    const {record} = props;

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
                                <SelectInput  optionText = {contact => `${contact.firstName}` + ` ` + `${contact.lastName}` }/>
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
                            >
                            <SelectInput  optionText = 'name'  autoSave/>
                        </ReferenceInput>
                       <Divider style = {{width: '60%', margin: '0.8rem'}}/>
                        <ReferenceManyField label = 'Borrower Company Ownership Percentages' reference = 'borrower_company_ownerships' target = 'borrowers'>
                            <Datagrid >
                            <FieldGuesser source = 'contact' />
                            <FieldGuesser source = 'ownershipPercent' />
                            <DeleteButton />
                            </Datagrid>
                        </ReferenceManyField>
                        <ModalCreateButton
                                        dialogResource="borrower_company_ownerships"
                                        dialogFormField="borrower_company_ownerships"
                                        dialogTitle="Add a Company Borrower Ownership"
                                        dialogMergeFormValues={{ borrower: record.id }}
                                        // dialogRedirect={`/projects/${encodeURIComponent(
                                        //     record.id
                                        // )}/edit_borrowers`}
                                        dialogAddTextLabel="Add a Company Borrower"
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