import * as React from "react";
import { Route } from 'react-router-dom';
import { InviteEdit } from './invite/InviteEdit';

export default [
    <Route exact path="/invite/confirm/:token" component={InviteEdit} noLayout />,
];


