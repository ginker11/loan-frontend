import React from 'react';
import {ShowGuesser} from "@api-platform/admin";
import Typography from '@material-ui/core/Typography'
import {TextField, EmailField} from 'react-admin';

const ShowTitle = ({ record }) => {
    return <span>{'Contacts - ' + record.firstName + ' ' + record.lastName}</span>
}
const Aside = () => (
    <div style={{ width: 200, margin: '1em' }}>
        <Typography variant="h6">Post details</Typography>
        <Typography variant="body2">
            Posts will only be published one an editor approves them
        </Typography>
    </div>
);
export const ContactsShow = props => {
    return (
         <ShowGuesser  title = {<ShowTitle />} aside = {<Aside />} {...props}>
            <TextField  source = 'firstName' />
             <TextField  source = 'lastName' />
             <EmailField  source = 'email' />
             <TextField source = 'streetAddress' />
             <TextField source = 'city' />
             <TextField source = 'state' />
             <TextField source = 'country' />
             <TextField source = 'postalCode' />
         </ShowGuesser>
    )
}