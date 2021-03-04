import React from 'react';
import {UserMenu, MenuItemLink} from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';


export default function MyUserMenu(props) {
    return (
        <UserMenu {...props}>
            <MenuItemLink to = {'/'} 
                primaryText = {'profile'} 
                leftIcon = {<SettingsIcon />}
                onClick = {props.onClick} 
                sidebarIsOpen 
            />
        </UserMenu>
    )
}
