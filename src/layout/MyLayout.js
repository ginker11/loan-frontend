import * as React from 'react';
import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';
import MySideMenu from './MySideMenu';
import {theme} from './Theme';


const MyLayout = (props) =>{
    
    return(
         <Layout {...props} appBar={MyAppBar} menu = {MySideMenu} theme = {theme} />
    )
} 

export default MyLayout;
