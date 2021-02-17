import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { DashboardMenuItem, MenuItemLink } from 'react-admin';
import ContactsIcon from '@material-ui/icons/Contacts';
import BusinessIcon from '@material-ui/icons/Business';
import MoneyIcon from '@material-ui/icons/Money';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const MySideMenu = ({ onMenuClick, toggleSidebar, logout }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);

    return (
        <div>
            <MenuItemLink to = '/home' primaryText = 'Home' 
                          leftIcon = {<DashboardIcon onClick = {onMenuClick} />}
                          sidebarIsOpen = {open} />

            <MenuItemLink to = '/contacts' primaryText = 'Contacts' 
                          leftIcon = {<ContactsIcon onClick = {onMenuClick} />}
                          sidebarIsOpen = {open} />
            <MenuItemLink to = '/companies' primaryText = 'Companies' 
                          leftIcon = {<BusinessIcon onClick = {onMenuClick} />}
                          sidebarIsOpen = {open}/>
            <MenuItemLink to = '/financing_sources' primaryText = 'Financing Sources' 
                          leftIcon = {<MoneyIcon onClick = {onMenuClick} />}
                          sidebarIsOpen = {open} />
            <MenuItemLink to = '/projects' primaryText = 'Projects' 
                          leftIcon = {<AssignmentIcon onClick = {onMenuClick} />}
                          sidebarIsOpen = {open}/> 
            <MenuItemLink to = '/lien_positions' primaryText = 'Lien Positions' 
                          leftIcon = {<FormatListNumberedIcon onClick = {onMenuClick} /> }
                          sidebarIsOpen = {open} />
            <MenuItemLink to = '/borrowers' primaryText = 'Borrowers' 
                          leftIcon = {<PeopleIcon onClick = {onMenuClick} /> }
                          sidebarIsOpen = {open} />
            {/* <MenuItemLink to = '/borrower_company_ownership' primaryText = 'Borrower Company Ownership' 
                          leftIcon = {<AccountBalanceIcon onClick = {onMenuClick} /> }
                          sidebarIsOpen = {open} /> */}
            {isXSmall && logout}
        </div>
    );
};

export default MySideMenu;