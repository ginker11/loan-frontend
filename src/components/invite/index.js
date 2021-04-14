import React from 'react';
import { ResourceGuesser } from "@api-platform/admin";

import {InviteEdit} from './InviteEdit';

export default  (
    <ResourceGuesser name = 'users' list = {true} show = {true} edit = {InviteEdit} create = {false}/>
);