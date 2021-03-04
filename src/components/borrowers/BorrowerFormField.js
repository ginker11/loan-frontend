import React, {useState} from 'react';
import {
  ReferenceInput,
  AutocompleteInput,
  SelectInput, required
} from 'react-admin';
import ContactFormField from '../contacts/ContactFormField';
import CompanyFormField from '../companies/CompanyFormField';
import ModalCreateButton from '../helpers/ModalCreateButton'; 
import { Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContactsIcon from '@material-ui/icons/Contacts';
import BusinessIcon from '@material-ui/icons/Business';


const ContactBorrowerFormField = (props) => {
  return (
    <>
          <Grid item xs={10} sm={10}>
            <ReferenceInput
              source="contact"
              reference="contacts"
              label="Contact"
              allowEmpty
              fullWidth
            >
              <SelectInput  optionText = {contact => `${contact.firstName}` + ` ` + `${contact.lastName}` }  validate={[required()]}/>
            </ReferenceInput>
          </Grid>
          <Grid item xs={2} sm={2}>
            <ModalCreateButton
                dialogResource="contacts"
                dialogFormField="contact"
                dialogTitle="Add a Contact"
                actionTypeCreate
            >
                    <ContactFormField />
            </ModalCreateButton>
          </Grid>
    </>
  )
}

const CompanyBorrowerFormField = (props) => {
  const {isDisabled} = props;
  return(
    <>
            <Grid item xs={10} sm={10}>
              <ReferenceInput
                source="company"
                reference="companies"
                label="Company"
                fullWidth
                allowEmpty
              >
                  <SelectInput optionText="name" validate={[required()]}/>
              </ReferenceInput>
            </Grid>
            <Grid item xs={2} sm={2}>
              <ModalCreateButton
                  dialogResource="companies"
                  dialogFormField="company"
                  dialogTitle="Add a Company"
                  actionTypeCreate
                  >
                      <CompanyFormField />
              </ModalCreateButton>
            </Grid>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  iconButton: {
    width: '8rem',
    height: '8rem',
    '& svg': {
      fontSize: '4.5rem'
    },
    marginBottom: '2rem'
  }
}));

const BorrowerFormField = ({ record }) => {
  const [option, setOption] = useState(0);
  const classes = useStyles();

  const handleClick = event => {
    console.log(event.target.value);
    setOption(event.target.value);
  }
  return (
    <>
      <Grid  container direction = 'row' justify = 'center' alignItems = 'center' spacing={3}>
        <Grid item xs = {12}>
          <Typography variant = 'subtitle1' color = 'textSecondary' style = {{marginBottom: '1rem'}}>
              Select the type of borrower you wish to create
         </Typography>
        </Grid>
        <Grid item xs = {12} sm = {6}>
          <Grid container direction = 'column' justify = 'center' alignItems = 'center' spacing = {1}>
            <Grid item>
              <Typography variant = 'subtitle1'>Contact</Typography>
            </Grid>
            <Grid item>
              <IconButton color = {(option == 1) ? 'primary' : 'secondary'} value = {1} className = {classes.iconButton} onClick = {handleClick}>
                <ContactsIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs = {12} sm = {6}>
          <Grid container direction = 'column' justify = 'center' alignItems = 'center' spacing = {1}>
            <Grid item>
              <Typography variant = 'subtitle1'>Company</Typography>
            </Grid>
            <Grid item>
              <IconButton color = {(option == 2) ? 'primary' : 'secondary'} value = {2}  className = {classes.iconButton} onClick = {handleClick}>
                <BusinessIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={0}>
              {(option == 1) ? <ContactBorrowerFormField key = {option} /> : (
                (option == 2) ? <CompanyBorrowerFormField key = {option} /> : null)}
        </Grid>
    </Grid>
    </>
  )
}
export default BorrowerFormField;