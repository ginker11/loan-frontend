import React from 'react';
import {ListGuesser} from "@api-platform/admin";
import {TextField} from 'react-admin';
import {ListActions} from '../ListActions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    contact: {
       fontSize: '1.25em'
    },

});

export const CompanyList = props => {
    const classes = useStyles();
    return (
         <ListGuesser  className = {classes.headers} actions = {<ListActions />} title = 'Companies' {...props}>
             <TextField className = {classes.contact} source = 'name' />
             <TextField className = {classes.contact} source = 'city' />
             <TextField className = {classes.contact} source = "state" />
         </ListGuesser>
    )
}
