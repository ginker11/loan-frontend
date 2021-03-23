import React from 'react';
import { SimpleShowLayout, Show } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Paper } from '@material-ui/core';
import { getUsername } from '../authProvider';
import { currencyFormat } from "../../util";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    gridItem: {
        width: '15%'
    },
    nestedGridItem: {
        width: '95%'
    },
    addButton: {
        width: '5%'
    },
    selectItem: {
        width: '90%'
    },
    cellbg: {
        backgroundColor: '#eee'
    }
}));


const ProjectShowInfo = ({ record }) => {
    const classes = useStyles();
    // const record = props.record;

    let totalFinancingAmount = 0;
    let totalMonthlyPAndI = 0;
    record.projectFinancingSources.forEach( source => {
        totalFinancingAmount += parseFloat(source['amount']);
        totalMonthlyPAndI += parseFloat(source['principalAndInterestPayment']);
    });

    return(
        <>
            {console.log(record)}
            <h1>Credit Memo Summary</h1>

            {/*<b>Date: {new Date().toDateString() }</b>*/}
            <b>Credit Memo Summary: {record.operatingCompany.name}</b>

            <p>Prepared by: {getUsername()}</p>

            <p><b>Project collateral property:</b> {record.streetAddress} {record.city}, {record.state} {record.postalCode} {record.country}</p>

            <p>
                <b>Project Costs</b>
                <ul>
                    <li>Total project costs are ${parseFloat(record.purchaseLandAndBuilding) + parseFloat(record.tenantImprovement) + parseFloat(record.eligibleFees)}; Purchased Land and Building ${record.purchaseLandAndBuilding}.</li>
                    <li>((Project Description))</li>
                </ul>
            </p>

            <b>Financing</b>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead className={classes.cellbg}>
                        <TableRow>
                            <TableCell>Source</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Term</TableCell>
                            <TableCell align="right">%</TableCell>
                            <TableCell align="right">P&amp;I</TableCell>
                            <TableCell align="right">Amort</TableCell>
                            <TableCell align="right">Rate</TableCell>
                            <TableCell align="right">Lien</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {record.projectFinancingSources.map((row) => (
                            <TableRow key={row.financingSource.name}>
                                <TableCell component="th" scope="row">
                                    {row.financingSource.name}
                                </TableCell>
                                <TableCell align="right">{currencyFormat(row.amount)}</TableCell>
                                <TableCell align="right">{row.term}</TableCell>
                                <TableCell align="right">{row.percentage}%</TableCell>
                                <TableCell align="right">{currencyFormat(row.principalAndInterestPayment)}</TableCell>
                                <TableCell align="right">{row.amortization}</TableCell>
                                <TableCell align="right">{row.rate}%</TableCell>
                                <TableCell align="right">{row.lienPosition.position}</TableCell>
                            </TableRow>
                        ))}
                        <tr>
                            <TableCell className={classes.cellbg}><b>Total Financing:</b></TableCell>
                            <TableCell align="right"><b>{currencyFormat(totalFinancingAmount)}</b></TableCell>
                            <TableCell align="right" className={classes.cellbg} colSpan={2}><b>Total Monthly P&I Payment</b></TableCell>
                            <TableCell align="right"><b>{currencyFormat(totalMonthlyPAndI)}</b></TableCell>
                            <TableCell align="right" className={classes.cellbg} colSpan={2}><b>Total Annualized Payments</b></TableCell>
                            <TableCell align="right"><b>{currencyFormat(totalMonthlyPAndI * 12)}</b></TableCell>
                        </tr>
                        <tr>
                            <TableCell><b>Prepayment Penalty</b></TableCell>
                            <TableCell colSpan={7}>{record.paymentPenalty ? 'Yes' : 'no'}</TableCell>
                        </tr>
                        <tr>
                            <TableCell className={classes.cellbg}><b>Interim Lender</b></TableCell>
                            <TableCell colSpan={7}>(( Interim lender ))</TableCell>
                        </tr>
                        <tr>
                            <TableCell className={classes.cellbg} colSpan={8}>The CDC Interest Rate in the Financing Chart represents the coupon rate on the note. The SBA monthly P&I payment is calculated based on the "all-in" rate (coupon plus other fees) for the first 5 year period.</TableCell>
                        </tr>
                    </TableBody>
                </Table>
            </TableContainer>

            <br/>

            {record.borrower.map((b) => {
                if ('company' in b) {
                    let contactItems = [];
                    b.borrowerCompanyOwnership.forEach((bco) => {
                        contactItems.push(<li>{bco.ownershipPercent}% owned by {bco.contact.name}</li>);
                    });

                    return(
                        <>
                            <b>Borrower/EPC: {b.company.name}</b>
                            <ul>
                                {contactItems}
                            </ul>
                            <br/>

                        </>
                    )
                }
            })}
        </>
    );
};

export const ProjectsShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <ProjectShowInfo />
        </SimpleShowLayout>
    </Show>
);