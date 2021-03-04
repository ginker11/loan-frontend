import React from 'react';
import {ListGuesser} from "@api-platform/admin";
import {ListActions} from '../actions/ListActions';
import {TextField} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    contact: {
       fontSize: '1.25em'
    },

});

export const FinancingSourcesList = props => {
    const classes = useStyles();
    return (
         <ListGuesser  className = {classes.headers} actions = {<ListActions title = 'Financing Sources'/>}  {...props}>
             <TextField className = {classes.contact} source = 'name' />
         </ListGuesser>
    )
}

