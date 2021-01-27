import React from 'react';
import {UserMenu, MenuItemLink, useTranslate} from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


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
