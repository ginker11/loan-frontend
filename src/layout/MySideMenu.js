import React from 'react';
import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { DashboardMenuItem, MenuItemLink, getResources } from 'react-admin';
import ContactsIcon from '@material-ui/icons/Contacts';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import BusinessIcon from '@material-ui/icons/Business';
import MoneyIcon from '@material-ui/icons/Money';
import DashboardIcon from '@material-ui/icons/Dashboard';
const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgba(167,173,186,0.4)'
    },
    divider: {
        backgroundColor: 'rgba(80,80,80,0.2)'
    },
    button: {
        color: 'rgba(201, 36, 3, 0.8)',
    },
    dshButton: {
        color: 'rgba(5, 4, 1, 0.8)'
    }
});

const MySideMenu = ({ onMenuClick, toggleSidebar, logout }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const classes = useStyles();

    return (
        <div className = {classes.root}>
            <MenuItemLink to = '/' primaryText = 'Home' 
                          leftIcon = {<DashboardIcon className = {classes.dshButton}/>} onClick = {onMenuClick}
                          sidebarIsOpen = {open} />
            <Divider className = {classes.divider}/>
            <MenuItemLink to = '/contacts' primaryText = 'Contacts' 
                          leftIcon = {<ContactsIcon className = {classes.button}/>} onClick = {onMenuClick}
                          sidebarIsOpen = {open} />
            <Divider className = {classes.divider}/>
            <MenuItemLink to = '/companies' primaryText = 'Companies' 
                          leftIcon = {<BusinessIcon className = {classes.button}/>} onClick = {onMenuClick}
                          sidebarIsOpen = {open} />
             <Divider className = {classes.divider}/>
            <MenuItemLink to = '/financing_sources' primaryText = 'Financing Sources' 
                          leftIcon = {<MoneyIcon className = {classes.button}/>} onClick = {onMenuClick}
                          sidebarIsOpen = {open} />
            {isXSmall && logout}
        </div>
    );
};

export default MySideMenu;