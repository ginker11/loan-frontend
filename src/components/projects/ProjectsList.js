import React from 'react';
import { ListActions } from '../actions/ListActions';
import { TextField, List, Datagrid, ReferenceField, EditButton, FunctionField} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    row: {
       fontSize: '1.25em'
    }

});

export const ProjectsList = props => {
    const classes = useStyles();
    return (
        <List className = {classes.headers} actions = {<ListActions title = 'Projects'/>}  {...props}>
            <Datagrid> 
                <ReferenceField label = 'Operating Company' source = 'operatingCompany' reference = 'companies'>
                    <TextField source = 'name' />
                </ReferenceField>
                <FunctionField label = 'Total Budget' 
                    render = {record => `$${ (parseFloat(record.purchaseLandAndBuilding) + parseFloat(record.tenantImprovement) 
                                        + parseFloat(record.eligibleFees)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` } 
                />
                <TextField source = 'city' />
                <EditButton />
            </Datagrid>
         </List>         
    )
}
