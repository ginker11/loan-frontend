import React from 'react';
import {ResourceGuesser } from "@api-platform/admin";
import {ProjectsList} from './ProjectsList';
import {ProjectsCreate} from './ProjectsCreate';
import {ProjectsEdit} from './ProjectsEdit';

export default ( <ResourceGuesser name = 'projects' list = {ProjectsList} show = {false}
                    create = {ProjectsCreate} edit = {ProjectsEdit} /> 
);