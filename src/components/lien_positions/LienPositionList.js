import React from 'react';
import {ListGuesser} from "@api-platform/admin";
import {ListActions} from '../actions/ListActions';
import {TextField} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    row: {
       fontSize: '1.25em'
    },

});

export const LienPositionList = props => {
    const classes = useStyles();
    return (
         <ListGuesser actions = {<ListActions title = 'Lien Positions'/>}  {...props}>
             <TextField className = {classes.row} source = 'position' />
         </ListGuesser>
    )
}
