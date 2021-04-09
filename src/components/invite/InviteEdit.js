import React from 'react';
import { EditGuesser } from "@api-platform/admin";
import { TextInput, SimpleForm } from 'react-admin';
import { EditActions } from '../actions/EditActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { inviteConfirm } from '../actions/invite/ConfirmActions';

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

const HandleSubmit = (input, props) => {
    if (input.newPassword == input.confirmPassword) {
        console.log(input);
        console.log(props);
        const confirmed = inviteConfirm(input, {
            confirmationToken: props.match.params.token,
            plainPassword: input.newPassword
        })
        const result = confirmed(null);
        result.then(response => {
            //successful, redirect to login
        })
            .catch(error => {
                //look at error, output error message
            })
        console.log(confirmed);
        console.log(result);
    }
}
const InviteTitle = ({record}) => {
    return 'Reset Password - ' + record.email
}

export const InviteEdit = props => {
    console.log(props);
    const classes = useStyles();
    return(
        <SimpleForm save = {formValues => HandleSubmit(formValues, props)}>
            {/*<InviteTitle />*/}
            <div className = {classes.root}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                    <TextInput fullWidth  label = 'New Password' type = 'password' source = 'newPassword' />
                    <TextInput fullWidth  label = 'Confirm New Password' type = 'password' source = 'confirmPassword' />
                </Grid>
            </div>
        </SimpleForm>

    )
}