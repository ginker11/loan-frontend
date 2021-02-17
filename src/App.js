import * as React from "react";
import { HydraAdmin } from "@api-platform/admin";

import authProvider from "./components/authProvider";
import MyLayout from './layout/MyLayout';
import DataProvider from './components/DataProvider.js'
import Resources from './components/Resources';

const entrypoint = process.env.REACT_APP_API_ENTRYPOINT;

export default () => (
    <HydraAdmin entrypoint={entrypoint} layout={MyLayout}  dataProvider={DataProvider} // authProvider = {authProvider} 
    >
        {Resources}
    </HydraAdmin>
);