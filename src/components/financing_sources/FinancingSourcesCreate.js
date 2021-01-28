import React from 'react';
import {CreateGuesser} from "@api-platform/admin";
import { TextInput} from 'react-admin';
import {EditActions} from '../actions/EditActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    gridItem: {
        width: '10%'
    }
  }));

const FinancingSourceTitle = ({record}) => {
    return 'Create a new Financing Source'
}
export const FinancingSourcesCreate = props => {
    const classes = useStyles();
    return (
            <CreateGuesser title = {<FinancingSourceTitle />} actions = {<EditActions />} {...props}>
                <div className = {classes.root}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                        <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {6}>
                            <TextInput fullWidth  label = 'Name' source = 'name' />
                        </Grid>
                    </Grid>
                 </div>
            </CreateGuesser>  
    )
}