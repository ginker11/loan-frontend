import React, { useState, useEffect } from 'react';
import { Loading, Error, useQuery} from 'react-admin';
import { Grid, Typography, Card, Divider, CardContent } from '@material-ui/core';



const ProjectFinancingSourceSummary = (props) => {
    const {projectId} = props;

    let totalFinancingAmount = 0;
    let totalMonthlyPAndI = 0;
    
    //This query gets the relevant financing sources for the specific project
    const {data, loading, error} = useQuery({
        type: 'getList',
        resource: 'project_financing_sources',
        payload: {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'id', order: 'DESC' },
            filter: {'project' : projectId},
        },
    });

    if (loading) return <Loading />;
    if (error) return <Error />;
    //If there's no data, return an empty component
    if (!data || data.length === 0) return null;


    //Go through data to obtain relevant sums
    data.forEach((source, index) => {
        totalFinancingAmount += parseFloat(source['amount']);
        totalMonthlyPAndI += parseFloat(source['principalAndInterestPayment']);
    })
    return(
        <div style = {{width: '100%', marginTop: '1.5rem'}}>
            <Grid container spacing = {4} alignItems = 'center'>
                <Grid item xs = {12}>
                    <br />
                    <Typography variant = 'h5' gutterBottom>
                        Financing Sources Summary
                    </Typography>         
                </Grid>
                <Grid item xs = {12} sm = {6} lg = {4}>
                    <Card>
                        <CardContent>
                            <Typography variant = 'subtitle1' gutterBottom> 
                                Total Financing Amount
                            </Typography>
                            <Divider />
                            <br />
                            <Typography variant = 'h5' gutterBottom>
                                {`$${totalFinancingAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs = {12} sm = {6} lg = {4}>
                    <Card>
                        <CardContent>
                            <Typography variant = 'subtitle1' gutterBottom> 
                                Total Monthly Principal and Interest
                            </Typography>
                            <Divider />
                            <br />
                            <Typography variant = 'h5' gutterBottom>
                                {`$${totalMonthlyPAndI.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs = {12} sm = {6} lg = {4}>
                    <Card>
                        <CardContent>
                            <Typography variant = 'subtitle1' gutterBottom> 
                                Total Annualized Payments
                            </Typography>
                            <Divider />
                            <br />
                                <Typography variant = 'h5' gutterBottom style = {{alignText : 'center'}}>
                                    {`$${(totalMonthlyPAndI * 12).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )    
   
}

export default ProjectFinancingSourceSummary;
