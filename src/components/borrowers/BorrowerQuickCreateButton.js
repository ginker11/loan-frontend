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
    ReferenceInput, 
    AutocompleteInput,
    SelectInput,
    SaveContextProvider
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import CompanyQuickCreateButton from '../companies/CompanyQuickCreateButton';
import ContactsQuickCreateButton from '../contacts/ContactsQuickCreateButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    gridItem: {
        width: '95%'
    },
    nestedGridItem: {
        width: '85%'
    },
    addButton: {
        width: '5%'
    },
    suggestionsContainerOpen: {
        zIndex: 2100,
      }
}));

function BorrowerQuickCreateButton({onChange}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [create, { loading }] = useCreate('borrowers');
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
                <DialogTitle>Create a new Borrower</DialogTitle>
                <FormWithRedirect resource='borrowers' save={handleSubmit}
                    render={({
                        handleSubmitWithRedirect,
                        pristine,
                        saving
                    }) => (
                        <>
                           <DialogContent>
                           <div className = {classes.root}>
                                <Grid container direction="row" justify="center" alignItems="center" spacing={0}> 
                                    <Grid item className = {classes.gridItem}>
                                        <Grid container direction = 'row' alignItems="center" spacing = {0}>
                                            <Grid item className = {classes.nestedGridItem}>
                                                <ReferenceInput source='company' reference='companies' label='Company' 
                                                    filterToQuery={(searchText) => ({ title: searchText })}>
                                                        <AutocompleteInput fullWidth options = {{suggestionsContainerProps: {className : classes.suggestionsContainerOpen}}}
                                                            optionText='name'/>
                                                </ReferenceInput>
                                            </Grid>
                                            <Grid item className = {classes.addButton}>
                                                    <CompanyQuickCreateButton />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item className = {classes.gridItem}>
                                        <Grid container direction = 'row' alignItems="center" spacing = {0}>
                                            <Grid item className = {classes.nestedGridItem}>
                                                <ReferenceInput source='contact' reference='contacts' label='Contact' 
                                                    filterToQuery={(searchText) => ({ title: searchText })}>
                                                        <AutocompleteInput  fullWidth options = {{suggestionsContainerProps: {className : classes.suggestionsContainerOpen}}} 
                                                            optionText = {
                                                                contact => `${contact.firstName}` + ' ' + `${contact.lastName}` } 
                                                        />
                                                </ReferenceInput>
                                            </Grid>
                                            <Grid item className = {classes.addButton}>
                                                    <ContactsQuickCreateButton />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                           </div>
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

export default BorrowerQuickCreateButton;