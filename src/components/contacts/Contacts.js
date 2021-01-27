import React from 'react';
import {ResourceGuesser} from "@api-platform/admin";
import {ContactsList} from './ContactsList';

const Contacts = (props) => <ResourceGuesser name = 'contacts' list = {ContactsList} />;

export default Contacts;
