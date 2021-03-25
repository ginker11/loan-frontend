import React from 'react';
import {ResourceGuesser } from "@api-platform/admin";
import {ProjectsList} from './ProjectsList';
import {ProjectsCreate} from './ProjectsCreate';
import {ProjectsEdit} from './ProjectsEdit';
import {ProjectsShow} from './ProjectsShow';

export default ( <ResourceGuesser name = 'projects' list = {ProjectsList} show = {ProjectsShow}
                    create = {ProjectsCreate} edit = {ProjectsEdit} /> 
);