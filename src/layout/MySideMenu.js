import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { DashboardMenuItem,  MenuItemLink } from 'react-admin';
import ContactsIcon from '@material-ui/icons/Contacts';
import BusinessIcon from '@material-ui/icons/Business';
import MoneyIcon from '@material-ui/icons/Money';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SubMenu from './SubMenu';

const MySideMenu = ({ onMenuClick, toggleSidebar, logout, dense = false }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const [state, setState] = useState({
        menuConfigurations: true,
    });
    const handleToggle = (menu) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div>
            <MenuItemLink to = '/home' primaryText = 'Home' 
                          leftIcon = {<DashboardIcon onClick = {onMenuClick} dense={dense}/>}
                          sidebarIsOpen = {open} />
            <MenuItemLink to = '/projects' primaryText = 'Projects' 
                          leftIcon = {<AssignmentIcon onClick = {onMenuClick} dense={dense} />}
                          sidebarIsOpen = {open}/> 
            <MenuItemLink to = '/contacts' primaryText = 'Contacts' 
                          leftIcon = {<ContactsIcon onClick = {onMenuClick} dense={dense}/>}
                          sidebarIsOpen = {open} />
             <MenuItemLink to = '/companies' primaryText = 'Companies' 
                            leftIcon = {<BusinessIcon onClick = {onMenuClick} dense={dense}/>}
                            sidebarIsOpen = {open}/>
            <SubMenu                 
                handleToggle={() => handleToggle('menuConfigurations')}
                isOpen={state.menuConfigurations}
                sidebarIsOpen={open}
                name="Configurations"
                icon={<ChevronRightIcon/>}
                dense={dense}>
                <MenuItemLink to = '/financing_sources' primaryText = 'Financing Sources' 
                            leftIcon = {<MoneyIcon onClick = {onMenuClick} />}
                            sidebarIsOpen = {open} dense={dense}/>
                
                <MenuItemLink to = '/lien_positions' primaryText = 'Lien Positions' 
                            leftIcon = {<FormatListNumberedIcon onClick = {onMenuClick} /> }
                            sidebarIsOpen = {open} dense={dense}/>
            </SubMenu>
            
            {isXSmall && logout}
        </div>
    );
};

export default MySideMenu;