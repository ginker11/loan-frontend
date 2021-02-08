import React from 'react';
import {ResourceGuesser} from "@api-platform/admin";
import {ContactsList} from './ContactsList';
import {ContactsCreate} from './ContactsCreate';
import {ContactsEdit} from './ContactsEdit';

export const Contacts = (props) => <ResourceGuesser name = 'contacts' list = {ContactsList} show = {false}
                                create = {ContactsCreate} edit = {ContactsEdit}/>;

