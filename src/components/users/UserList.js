import React from 'react';
import { ListGuesser } from "@api-platform/admin";
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

export const UserList = props => {
    const classes = useStyles();
    return (
        <ListGuesser  className = {classes.headers} actions = {<ListActions />} title = 'User' {...props}>
            <TextField className = {classes.user} source = 'firstName' />
            <TextField className = {classes.user} source = 'lastName' />
            <EmailField className = {classes.user} source = 'email' />
            <TextField className = {classes.user} label = 'Role' source = 'roles' />
        </ListGuesser>
    )
}
