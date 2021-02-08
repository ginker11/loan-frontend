import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import {
    required,
    Button,
    SaveButton,
    TextInput,
    useCreate,
    useNotify,
    FormWithRedirect,
    SaveContextProvider
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

function CompanyQuickCreateButton({onChange}) {
    const [open, setOpen] = useState(false);
    const [create, { loading }] = useCreate('companies');
    const notify = useNotify();
    const createForm = useForm();

    const handleClick = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    const handleSubmit = async values => {
        create(
            {payload: {data : values} },
            {
                onSuccess: ({ data }) => {
                    setOpen(false);
                    createForm.change('id', data.id);
                    onChange();
                },
                onFailure: ({ error }) => {
                    notify(error.message, 'error');
                }
            }
        );
    };

    return (
        <>
            <Button onClick = {handleClick} label = ''>
                <IconContentAdd />
            </Button>
            <Dialog fullWidth open = {open} onClose = {handleClose} aria-label = 'Create post'>
                <DialogTitle>Create a new Company</DialogTitle>
                <FormWithRedirect resource='companies' save={handleSubmit}
                    render={({
                        handleSubmitWithRedirect,
                        pristine,
                        saving
                    }) => (
                        <>
                           <DialogContent>
                                <TextInput fullWidth  label = 'Company Name' source = 'name' id = 'companyName2' />
                                <TextInput fullWidth label = 'Street Address' source = 'streetAddress' id = 'streetAddress2' />
                                <TextInput fullWidth label = 'City' source = 'city' id = 'city2' />
                                <TextInput fullWidth label = 'State' source = 'state' id = 'state2'/>
                                <TextInput fullWidth label = 'Country' source = 'country' id = 'country2'/>
                                <TextInput fullWidth label = 'Postal Code' source = 'postalCode' id = 'postalCode2'/>
                           </DialogContent>
                           <DialogActions>
                                <Button
                                    label="Cancel"
                                    onClick={handleClose}
                                    disabled={loading}
                                >
                                    <IconCancel />
                                </Button>
                                <SaveButton
                                    handleSubmitWithRedirect={
                                        handleSubmitWithRedirect
                                    }
                                    pristine={pristine}
                                    saving={saving}
                                    disabled={loading}
                                    label = 'Save'
                                />
                            </DialogActions>
                        </>
                    )}
                />
            </Dialog>
        </>
    );
}

export default CompanyQuickCreateButton;