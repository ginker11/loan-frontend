import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    headerText: {
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    dataText: {
        fontSize:'0.8rem'
    }

  }));
const PostPanel = ({ id, record, resource }) => {
    const classes = useStyles();
    return (
    <div style = {{width: '90%', marginLeft: '3%'}}>
        <Grid container direction = 'row' spacing = {2}  alignItems = 'center'>
            <Grid item xs = {2}>
                <Grid container direction = 'column' spacing = {0} justify = 'center' alignItems = 'center'>
                    <Grid item>
                        <Typography variant = 'h5' gutterBottom className={classes.headerText}>
                            Rate
                        </Typography>
                    </Grid>
           
                    <Grid item>
                        <Typography variant = 'subtitle1' gutterBottom className={classes.dataText}>
                            {record.rate}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs = {4}>
                <Grid container direction = 'column' spacing = {0} justify = 'center' alignItems = 'center'>
                    <Grid item>
                        <Typography variant = 'h5' gutterBottom className={classes.headerText}>
                            {"Principal & Interest Payment"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant = 'subtitle1' gutterBottom className={classes.dataText}>
                            {record.principalAndInterestPayment}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs = {2}>
                <Grid container direction = 'column' spacing = {0} justify = 'center' alignItems = 'center'>
                    <Grid item>
                        <Typography variant = 'h5' gutterBottom className={classes.headerText}>
                            Term
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant = 'subtitle1' gutterBottom className={classes.dataText}>
                            {record.term}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs = {2}>
                <Grid container direction = 'column' spacing = {0} justify = 'center' alignItems = 'center'>
                    <Grid item>
                        <Typography variant = 'h5' gutterBottom className={classes.headerText}>
                            Amortization
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant = 'subtitle1' gutterBottom className={classes.dataText}>
                            {record.amortization}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
)};

export default PostPanel;
