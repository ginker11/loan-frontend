import * as React from "react";
import { HydraAdmin } from "@api-platform/admin";

import authProvider from "./components/authProvider";
import MyLayout from './layout/MyLayout';
import DataProvider from './components/DataProvider.js'
import Resources from './components/Resources';
import customRoutes from './components/CustomRoutes';

const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <HydraAdmin entrypoint={entrypoint} layout={MyLayout} customRoutes={customRoutes} dataProvider={DataProvider}  authProvider = {authProvider}
    >
        {Resources}
    </HydraAdmin>
);

