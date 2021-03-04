import React from 'react';
import {ResourceGuesser} from "@api-platform/admin";
import {FinancingSourcesCreate} from './FinancingSourcesCreate';
import {FinancingSourcesEdit} from './FinancingSourcesEdit';
import {FinancingSourcesList} from './FinancingSourcesList';

export default (    <ResourceGuesser name = 'financing_sources' list = {FinancingSourcesList} 
                        show = {false} edit = {FinancingSourcesEdit} create = {FinancingSourcesCreate}/>
);