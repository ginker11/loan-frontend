import * as React from 'react';
import { Layout, Sidebar } from 'react-admin';
import MyAppBar from './MyAppBar';
import MySideMenu from './MySideMenu';
import {theme} from './Theme';

const CustomSidebar = (props) => <Sidebar {...props} size={200} />; 

const MyLayout = (props) =>{
    
    return(
         <Layout {...props} appBar={MyAppBar} sidebar={CustomSidebar}  menu = {MySideMenu} theme = {theme} />
    )
} 

export default MyLayout;
