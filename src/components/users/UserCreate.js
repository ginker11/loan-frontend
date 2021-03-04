import React from 'react';
// import {CreateGuesser} from "@api-platform/admin";
import { Create, SimpleForm, TextInput, useTranslate } from 'react-admin';
import { EditActions } from '../actions/EditActions';
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

const StaffTitle = ({record}) => {
    return 'Create a New Staff Account'
}

export const UserCreate = props => {
    const classes = useStyles();
    return(
        <Create title = {<StaffTitle />} actions = {<EditActions />} {...props}>
            <SimpleForm>
                <div className = {classes.root}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                        {/*<Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>*/}
                            <TextInput fullWidth  label = 'First Name' source = 'firstName' />
                        {/*</Grid>*/}
                        {/*<Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>*/}
                            <TextInput fullWidth  label = 'Last Name' source = 'lastName' />
                        {/*</Grid>*/}
                        {/*<Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>*/}
                            <TextInput fullWidth  label = 'Email Address' source = 'email' />
                        {/*</Grid>*/}
                        {/*<Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>*/}
                        {/*    <TextInput fullWidth label = 'Temporary Password' source = 'password' />*/}
                        {/*</Grid>*/}
                        {/*<Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>*/}
                            <TextInput fullWidth label = 'Role' source = 'roles' />
                        {/*</Grid>*/}
                    </Grid>
                </div>
            </SimpleForm>
        </Create>
    );

}