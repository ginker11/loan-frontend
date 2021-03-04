import * as React from 'react';
import {
    useListContext,
    TopToolbar,
    CreateButton,
    sanitizeListRestProps,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '90%',
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    title: {
        fontSize: '1.5rem',
        marginLeft: '-1rem'
    }
  }));


export const ListActions = (props) => {
    const classes = useStyles();
    const { className, title, ...rest } = props;
    const { basePath } = useListContext(props);

    return (
        <div className = {classes.root}>
            <Grid container direction="row"  alignItems="center" spacing={6}>
                <Grid item xs = {2} sm = {4} lg = {6}>
                    <Typography variant = 'h4' color = 'secondary' className = {classes.title}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs = {10} sm = {8} lg = {6}>
                    <TopToolbar className={className} {...sanitizeListRestProps(rest)} >
                        <CreateButton basePath={basePath} label = 'Create' />
                    </TopToolbar>
                </Grid>
            </Grid>
        </div>
        
    );
};