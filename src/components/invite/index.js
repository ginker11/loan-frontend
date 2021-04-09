import React from 'react';
import { ResourceGuesser } from "@api-platform/admin";

import {InviteEdit} from './InviteEdit';

export default  (
    <ResourceGuesser name = 'users' list = {false} show = {false} edit = {InviteEdit} create = {false}/>
);