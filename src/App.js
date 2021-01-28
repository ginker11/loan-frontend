import * as React from "react";
import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";
import MyLayout from './layout/MyLayout';
import {theme} from './util/Theme';

// Contacts
// import {Contacts} from './components/contacts/Contacts';
import {ContactsList} from './components/contacts/ContactsList';
import {ContactsEdit} from './components/contacts/ContactsEdit';
import {ContactsCreate} from './components/contacts/ContactsCreate';

// Companies
// import {Company} from './components/companies/Company';
import {CompanyList} from './components/companies/CompanyList';
import {CompanyEdit} from './components/companies/CompanyEdit';
import {CompanyCreate} from './components/companies/CompanyCreate';

import {FinancingSourcesList} from './components/financing_sources/FinancingSourcesList';
import {FinancingSourcesEdit} from './components/financing_sources/FinancingSourcesEdit';
import {FinancingSourcesCreate} from './components/financing_sources/FinancingSourcesCreate';


function App() {
  return (
    <div>
      <HydraAdmin entrypoint="http://bridge-loan-api.local:8989/api" theme={theme} layout = {MyLayout}>
                  <ResourceGuesser name = 'contacts' list = {ContactsList} show = {false} 
                      edit = {ContactsEdit} create = {ContactsCreate} />
                  {/* <Company /> Need to figure out the Company component*/}
                  <ResourceGuesser name = 'companies' list = {CompanyList} show = {false}
                      edit = {CompanyEdit} create = {CompanyCreate}/>
                  <ResourceGuesser name = 'financing_sources' list = {FinancingSourcesList} 
                      show = {false} edit = {FinancingSourcesEdit} create = {FinancingSourcesCreate}/>
      </HydraAdmin>
    </div>   
  )
}

export default App;