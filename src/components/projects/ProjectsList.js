import React from 'react';
import { ListGuesser } from "@api-platform/admin";
import { ListActions } from '../actions/ListActions';
import { TextField,  ReferenceField} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    row: {
       fontSize: '1.25em'
    }

});

export const ProjectsList = props => {
    const classes = useStyles();
    return (
            <ListGuesser  className = {classes.headers} actions = {<ListActions />} title = 'Projects' {...props}>
             <ReferenceField label = 'Operating Company' source = 'operatingCompany' reference = 'companies'>
                 <TextField source = 'name' />
             </ReferenceField>
         </ListGuesser>         
    )
}
