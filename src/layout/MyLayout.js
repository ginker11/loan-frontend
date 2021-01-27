import * as React from 'react';
import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';
import MySideMenu from './MySideMenu';

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} menu = {MySideMenu} />;

export default MyLayout;
