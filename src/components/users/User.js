import React from 'react';
import { ResourceGuesser } from "@api-platform/admin";

import {UserList} from './UserList';
import {UserEdit} from './UserEdit';
import {UserCreate} from './UserCreate';


export default  (
    <ResourceGuesser name = 'users' list = {UserList} show = {false} edit = {UserEdit} create = {UserCreate}/>
);

