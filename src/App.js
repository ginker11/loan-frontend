import * as React from "react";
import { HydraAdmin,
        ResourceGuesser,
        ListGuesser,
        FieldGuesser
      } from "@api-platform/admin";

import {TextField, EmailField} from 'react-admin';
import {ContactsList} from './components/ContactsList'
import {theme} from './util/Theme'


export default () => (
  <HydraAdmin entrypoint="http://bridge-loan-api.local:8989/api" theme={theme}
              // dataProvider = {dataProvider}
              // authProvider
              // loginPage {login}
              >
                <ResourceGuesser name = 'contacts' list = {ContactsList} />
  </HydraAdmin>

    
);