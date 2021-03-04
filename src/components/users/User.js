import React from 'react';
import { ResourceGuesser } from "@api-platform/admin";

import {UserList} from './UserList';
import {UserCreate} from './UserCreate';
import {UserEdit} from './UserEdit';

export const Users = (props) => {
    return (
        <ResourceGuesser name='users' list={UserList} show={false} create={UserCreate} edit={UserEdit}/>
    )
}


