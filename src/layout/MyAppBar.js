import React, {useContext} from 'react';
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
        fontSize: '1.6rem'
    }
});

const MyAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props} userMenu = {<MyUserMenu />}>
            <Typography
                variant="title"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
        </AppBar>
    );
};


// const MyAppBar = props => {
//     const classes = useStyles();
//     const {sideBarIsOpen, handleSideBar} = useContext(UIContext);
//     const handleOpen = () => {
//         handleSideBar();
//     }
//     let sideBarIcon = sideBarIsOpen ? <CloseIcon /> : <MenuIcon />;
    
//     return (
//         <div className = {classes.barRoot}>
//             <AppBar {...props} color = 'transparent'>
//                 <Toolbar>
//                     <IconButton onClick = {handleSideBar}>
//                         {sideBarIcon}
//                     </IconButton>
//                         <Typography variant="title" className = {classes.title} id="react-admin-title"/>
//                     <UserMenu />
//                 </Toolbar>
//             </AppBar>
//         </div>
//     )
// };

export default MyAppBar;