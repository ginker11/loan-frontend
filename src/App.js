import * as React from "react";
import { HydraAdmin } from "@api-platform/admin";

import authProvider from "./components/authProvider";
import { createBrowserHistory } from 'history';
import MyLayout from './layout/MyLayout';
import DataProvider from './components/DataProvider.js'
import Resources from './components/Resources';

const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;
const history = createBrowserHistory();

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <HydraAdmin
        entrypoint={entrypoint}
        layout={MyLayout}
        history={history}
        dataProvider={DataProvider}
        authProvider = {authProvider}
    >
        {Resources}
    </HydraAdmin>
);

