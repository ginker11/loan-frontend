import React, {useState, useEffect} from 'react';
import {CreateGuesser} from "@api-platform/admin";
import {TextInput, Create, SimpleForm, AutocompleteInput, ReferenceInput, useDataProvider} from 'react-admin';
import CompanyQuickCreateButton from '../companies/CompanyQuickCreateButton';
import {EditActions} from '../actions/EditActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {TestDiv} from '../TestDiv'
const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    gridItem: {
        width: '15%'
    },
    nestedGridItem: {
        width: '90%'
    },
    addButton: {
        width: '5%'
    }
  }));

const ProjectTitle = ({record}) => {
    return 'Create a new Project'
}

// export const ProjectsCreate = props => {
//     return (
//         <CreateGuesser  {...props}>
//              <ReferenceInput source='operatingCompany' reference='companies' label='Operating Company' 
//                                             filterToQuery={(searchText) => ({ name: searchText })}>
//                                                 <AutocompleteInput fullWidth optionText='name'/>
//             </ReferenceInput>
//         </CreateGuesser>
//     )
//     }
// }
export const ProjectsCreate = props => {
    const [companies, setCompanies] = useState([]);
    const dataProvider = useDataProvider();
    const [open, setOpen] = React.useState(false);

  
    // useEffect(() => {
    //     fetch("http://bridge-loan-api.local:8989/api/companies?page=1")
    //     .then(res => res.json())
    //     .then(data => {
    //         let list = data["hydra:member"];
    //         let fetchedCompanies = list.map((company) => {
    //             return {'id' : company.id, 'name' : company.name}
    //         })
    //         setCompanies(fetchedCompanies);
    //     })
        // dataProvider.getList('companies')
        // .then(({data}) => {
        //     console.log(data)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    // }, []);
    const classes = useStyles();
    return(
        <CreateGuesser title = {<ProjectTitle />} actions = {<EditActions />} {...props}>
                {/* <SimpleForm>
                <> */}
                    <TestDiv />
                    <div className = {classes.root}>
                        <TestDiv />
                        <Grid container direction="row" justify="center" alignItems="center" spacing={6}>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                 <Grid container direction = 'row' alignItems="center" spacing = {0}>
                                    <Grid item className = {classes.nestedGridItem}>
                                        <TestDiv />
                                        <ReferenceInput source='operatingCompany' reference='companies' label='Operating Company' 
                                            filterToQuery={(searchText) => ({ title: searchText })} {...props}>
                                                <AutocompleteInput fullWidth optionText='name'/>
                                        </ReferenceInput>
                                        {/* <AutocompleteInput fullWidth label = 'Operating Company' source = 'operatingCompany' choices = {companies} /> */}
                                    </Grid>
                                    <Grid item className = {classes.addButton}>
                                            <CompanyQuickCreateButton />
                                    </Grid>
                                </Grid>
                            </Grid>                           
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Street Address' source = 'streetAddress' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'City' source = 'city' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'State' source = 'state' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Country' source = 'country' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Postal Code' source = 'postalCode' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Purchase Land and Building' source = 'purchaseLandAndBuilding' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Tenant Improvement' source = 'tenantImprovement' />
                            </Grid>
                            <Grid item className = {classes.gridItem} xs = {12} sm = {6} lg = {4}>
                                <TextInput fullWidth label = 'Eligible Fees' source = 'eligibleFees' />
                            </Grid>
                        </Grid>
                    </div>
                {/* </>
                </SimpleForm> */}
        </CreateGuesser>
    )
}