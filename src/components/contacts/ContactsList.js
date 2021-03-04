import React, {cloneElement} from 'react';
import {ListGuesser} from "@api-platform/admin";
import {ListActions} from '../actions/ListActions';
import {
    TextField,
    EmailField,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    contact: {
       fontSize: '1.25em'
    }

});

export const ContactsList = props => {
    const classes = useStyles();
    return (
         <ListGuesser  className = {classes.headers} actions = {<ListActions title = 'Contacts'/>}  {...props}>
             <TextField className = {classes.contact} source = 'firstName' />
             <TextField className = {classes.contact} source = 'lastName' />
             <EmailField className = {classes.contact} source = 'email' />
         </ListGuesser>
    )
}

