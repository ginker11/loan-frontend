import * as React from "react";
import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";
import {ContactsList} from './components/contacts/ContactsList';
import {ContactsShow} from './components/contacts/ContactsShow';
import {CompanyList} from './components/companies/CompanyList';
import {FinancingSourcesList} from './components/financing_sources/FinancingSourcesList'
import MyLayout from './layout/MyLayout';
import {theme} from './util/Theme';

function App() {
  return (
    <div>
      <HydraAdmin entrypoint="http://bridge-loan-api.local:8989/api" theme={theme} layout = {MyLayout}>
                  <ResourceGuesser name = 'contacts' list = {ContactsList} show = {ContactsShow} />
                  <ResourceGuesser name = 'companies' list = {CompanyList} />
                  <ResourceGuesser name = 'financing_sources' list = {FinancingSourcesList} />
      </HydraAdmin>
    </div>   
  )
}

export default App;