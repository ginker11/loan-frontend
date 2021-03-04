import React from 'react';
import {ResourceGuesser } from "@api-platform/admin";
import {LienPositionCreate} from './LienPositionCreate';
import {LienPositionEdit} from './LienPositionEdit';
import {LienPositionList} from './LienPositionList';

export default (
    <ResourceGuesser name = 'lien_positions' list = {LienPositionList}
                show = {false} edit = {LienPositionEdit} create = {LienPositionCreate}/>
);