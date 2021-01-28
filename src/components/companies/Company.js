import React from 'react';
import { ResourceGuesser } from "@api-platform/admin";

import {CompanyList} from './CompanyList';
import {CompanyEdit} from './CompanyEdit';
import {CompanyCreate} from './CompanyCreate';


export const Company = props => {
    return (
        <ResourceGuesser name = 'companies' list = {CompanyList} show = {false} edit = {CompanyEdit} create = {CompanyCreate}/>
    )
}