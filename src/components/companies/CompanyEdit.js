import React from 'react';
import {EditGuesser} from "@api-platform/admin";
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
        width: '15%'
    }
  }));

const CompanyTitle = ({record}) => {
    return 'Edit - ' + record.name
}
export const CompanyEdit = props => {
    const classes = useStyles();

    return (
            <EditGuesser title = {<CompanyTitle />} actions = {<EditActions />} {...props}>
                <div className = {classes.root}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                        <Grid item className = {classes.gridItem} xs = {12} sm = {4} lg = {4}>
                            <TextInput fullWidth  label = 'Company Name' source = 'name' />
                        </Grid>
                        <Grid item className = {classes.gridItem} xs = {12} sm = {4} lg = {4}>
                            <TextInput fullWidth label = 'Street Address' source = 'streetAddress' />
                        </Grid>
                        <Grid item className = {classes.gridItem} xs = {12} sm = {4} lg = {4}>
                            <TextInput fullWidth label = 'City' source = 'city' />
                        </Grid>
                        <Grid item className = {classes.gridItem} xs = {12} sm = {4} lg = {4}>
                            <TextInput fullWidth label = 'State' source = 'state' />
                        </Grid>
                        <Grid item className = {classes.gridItem} xs = {12} sm = {4} lg = {4}>
                            <TextInput fullWidth label = 'Country' source = 'country' />
                        </Grid>
                        <Grid item className = {classes.gridItem} xs = {12} sm = {4} lg = {4}>
                            <TextInput fullWidth label = 'Postal Code' source = 'postalCode' />
                        </Grid>
                    </Grid>
                 </div>
            </EditGuesser>
       
            
    )
}