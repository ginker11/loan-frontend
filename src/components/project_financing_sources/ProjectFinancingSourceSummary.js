import React, { useState, useEffect } from 'react';
import { Loading, Error, useQuery, useListContext} from 'react-admin';
import { Grid, Typography, Card, Divider, CardContent } from '@material-ui/core';
import { currencyFormat } from "../../util";


const ProjectFinancingSourceSummary = (props) => {
    const [localTotalFinancingAmount, setLocalTotalFinancingAmount] = useState(0);
    const [localTotalMonthlyPAndI, setLocalTotalMonthlyPAndI] = useState(0);
    const [localTotalYearlyPAndI, setLocalTotalYearlyPAndI] = useState(0);

    const {data} = useListContext();

    useEffect(() => {
        let totalFinancingAmount = 0;
        let totalMonthlyPAndI = 0;

        if (!data || Object.keys(data).length === 0) return null;

        //Go through data to obtain relevant sums
        Object.keys(data).forEach((source, index) => {
            totalFinancingAmount += parseFloat(data[source]['amount']);
            totalMonthlyPAndI += parseFloat(data[source]['principalAndInterestPayment']);
        })

        setLocalTotalFinancingAmount(currencyFormat(totalFinancingAmount));
        setLocalTotalMonthlyPAndI(currencyFormat(totalMonthlyPAndI));
        setLocalTotalYearlyPAndI(currencyFormat(totalMonthlyPAndI * 12));
    }, [data]);

    //If there's no data, return an empty component
    if (!data || Object.keys(data).length === 0) return null;

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
                                {localTotalFinancingAmount}
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
                                {localTotalMonthlyPAndI}
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
                                    {localTotalYearlyPAndI}
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )    
   
}

export default ProjectFinancingSourceSummary;
