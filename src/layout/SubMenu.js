import * as React from 'react';
import {  Fragment, ReactElement } from 'react';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';

const useStyles = makeStyles(theme => ({
    header: {
        marginLeft: '0.2rem',
        backgroundColor: 'rgba(167,173,186,0.4)',
        borderBottom: '1px solid rgba(80,80,80,0.2)',
        width: '95.2%',
        fontWeight: '1.1rem'
    },
    headerClosed: {
        marginLeft: '0.2rem',
        backgroundColor: 'rgba(167,173,186,0.4)',
        borderBottom: '1px solid rgba(80,80,80,0.2)',
        width: '80%'
    },
    headerText: {
        marginLeft: '-0.9rem',
    },
    sidebarIsOpen: {
        '& a': {
            paddingLeft: theme.spacing(3),
            transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        },
    },
    sidebarIsClosed: {
        '& a': {
            transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        },
    },
}));


const SubMenu= ({
    handleToggle,
    sidebarIsOpen,
    isOpen,
    name,
    icon,
    children,
    dense,
}) => {
    const translate = useTranslate();
    const classes = useStyles();
    const headerClass = sidebarIsOpen ? classes.header : classes.headerClosed
    const header = (
        <MenuItem dense={dense} button onClick={handleToggle} className = {headerClass}>
            <ListItemIcon className={classes.icon}>
                {isOpen ? <ExpandMore /> : icon}
            </ListItemIcon>
            <Typography variant="inherit" color="textSecondary" className = {classes.headerText}>
                {name}
            </Typography>
        </MenuItem>
    );

    return (
        <Fragment>
            {sidebarIsOpen || isOpen ? (
                header
            ) : (
                <Tooltip title={translate(name)} placement="right">
                    {header}
                </Tooltip>
            )}
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List
                    dense={dense}
                    component="div"
                    disablePadding
                    className={
                        sidebarIsOpen
                            ? classes.sidebarIsOpen
                            : classes.sidebarIsClosed
                    }
                >
                    {children}
                </List>
            </Collapse>
        </Fragment>
    );
};

export default SubMenu;