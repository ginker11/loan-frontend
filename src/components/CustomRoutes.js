import * as React from "react";
import { Route } from 'react-router-dom';
import { InviteEdit } from './invite/InviteEdit';

export default [
    <Route exact path="/invite/confirm/:token" component={InviteEdit} noLayout />,
    // <Route exact path="/invite/confirm/:token" component={<p>hello</p>} />,
];


//connect url w/ token to InviteEdit page
//connect token to user
//update password for user
//redirect to login w/ new password