import React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MyUserMenu from './MyUserMenu';


const useStyles = makeStyles({
    barRoot: {
        minHeight: '2vh',
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        marginLeft: '2rem',
        fontSize: '1.8rem'
    }
});

const MyAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props} userMenu = {<MyUserMenu />}>
            <Typography
                variant="h1"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
        </AppBar>
    );
};

export default MyAppBar;