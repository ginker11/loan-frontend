import React from 'react';
import { TopToolbar, ListButton } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
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


export const EditActions = ({ basePath, data, title }) => {
    const classes = useStyles()
    return(
        <div className = {classes.root}>
            <Grid container direction="row"  alignItems="center" spacing={6}>
                <Grid item xs = {8} sm = {4} lg = {6}>
                    <Typography variant = 'h4' color = 'secondary' className = {classes.title}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs = {4} sm = {8} lg = {6}>
                    <TopToolbar>
                        <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
                    </TopToolbar>
                </Grid>
            </Grid>
        </div>
    );
}
