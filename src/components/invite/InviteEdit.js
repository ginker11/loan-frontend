import React from 'react';
import {TextInput, SimpleForm, AppBar, DeleteButton} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { inviteConfirm } from '../actions/invite/ConfirmActions';
import { /*Link,*/ Redirect } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2rem'
    },
    gridItem: {
        width: '15%'
    }
}));

const styles = makeStyles({
    barRoot: {
        minHeight: '2vh',
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        marginLeft: '0rem',
        fontSize: '1.8rem',
        color: 'white',
        textAlign: 'center',
        backgroundColor: "#000000"
    }
});

const HandleSubmit = (input, props) => {
    if (input.newPassword && input.newPassword == input.confirmPassword) {
        console.log(input);
        console.log(props);
        const confirmed = inviteConfirm(input, {
            confirmationToken: props.match.params.token,
            plainPassword: input.newPassword
        })
        const result = confirmed(null);

        result.then(response => {
            //successful, redirect to login
            console.log('the response', response)
            if(response.success){
                window.location.pathname = '/login/';
            }
        })
            .catch(error => {
                //look at error, output error message
                console.log('the error', error)
            })

        console.log(confirmed);
        console.log(result);
    }
}


const InviteTitle = ({record}) => {
    const classes = styles();
    return (
        <div>
            <Typography
                className={classes.title}
            >
                Bridge Loan App
            </Typography>
        </div>
    )
}


export const InviteEdit = props => {
    const classes = useStyles();
    return(
        <SimpleForm save = {formValues => HandleSubmit(formValues, props) } >
            <InviteTitle />
            <div className = {classes.root}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                    <TextInput fullWidth  label = 'New Password' type = 'password' source = 'newPassword' />
                    <TextInput fullWidth  label = 'Confirm New Password' type = 'password' source = 'confirmPassword' />
                </Grid>
            </div>
        </SimpleForm>
    )
}



