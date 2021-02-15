import * as React from "react";
import { HydraAdmin, hydraDataProvider as baseHydraDataProvider, fetchHydra as baseFetchHydra, useIntrospection, ResourceGuesser } from "@api-platform/admin";
import parseHydraDocumentation from "@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation";
import { Route, Redirect } from 'react-router-dom';

import authProvider from "./authProvider";
import MyLayout from './layout/MyLayout';

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

// Financing Sources
import {FinancingSourcesList} from './components/financing_sources/FinancingSourcesList';
import {FinancingSourcesEdit} from './components/financing_sources/FinancingSourcesEdit';
import {FinancingSourcesCreate} from './components/financing_sources/FinancingSourcesCreate';

// Lien Positions
import {LienPositionList} from './components/lien_positions/LienPositionList';
import {LienPositionCreate} from './components/lien_positions/LienPositionCreate';
import {LienPositionEdit} from './components/lien_positions/LienPositionEdit';

// Projects
import {ProjectsList} from './components/projects/ProjectsList';
import {ProjectsCreate} from './components/projects/ProjectsCreate';


const getHeaders = () => localStorage.getItem("token") ? {
  Authorization: `Bearer ${localStorage.getItem("token")}`
} : {};

const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;

const fetchHydra = (url, options = {}) => baseFetchHydra(url, { ...options, 
                                                        headers: getHeaders
                                                    });

const RedirectToLogin = () => {
    const introspect = useIntrospection();
    if (localStorage.getItem("token")) {
        introspect();
        return <></>;
    }
    return <Redirect to="/login" />;
};

const apiDocumentationParser = async (entrypoint) => {
    try {
        const { api } = await parseHydraDocumentation(entrypoint, {
            headers: getHeaders
        });
        return { api };
    } catch (result) {
        if (result.status === 401) {
            // Prevent infinite loop if the token is expired
            localStorage.removeItem("token");
            return {
                api: result.api,
                customRoutes: [
                    <Route path="/" component={RedirectToLogin} />
                ],
            };
        }
        throw result;
    }
};

const dataProvider = baseHydraDataProvider(entrypoint, fetchHydra, apiDocumentationParser);

export default () => (
    <HydraAdmin entrypoint={entrypoint}
        layout={MyLayout} 
        dataProvider={dataProvider}
        // authProvider = {authProvider}
    >
        <ResourceGuesser name = 'contacts' list = {ContactsList} show = {false} 
                edit = {ContactsEdit} create = {ContactsCreate} />
        <ResourceGuesser name = 'companies' list = {CompanyList} show = {false}
            edit = {CompanyEdit} create = {CompanyCreate}/>
        <ResourceGuesser name = 'projects' list = {ProjectsList}
            create = {ProjectsCreate} /> 
        <ResourceGuesser name = 'financing_sources' list = {FinancingSourcesList} 
            show = {false} edit = {FinancingSourcesEdit} create = {FinancingSourcesCreate}/>
        <ResourceGuesser name = 'lien_positions' list = {LienPositionList}
                show = {false} edit = {LienPositionEdit} create = {LienPositionCreate}/>
        <ResourceGuesser name = 'borrowers' show = {false}/>
        <ResourceGuesser name = 'project_financing_sources' show = {false} />
    </HydraAdmin>
);