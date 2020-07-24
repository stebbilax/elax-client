import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logoutButton: {
        marginLeft: "50px"
    }
}));

const Header = (props) => {
    const classes = useStyles;

    const logout = () => {
        props.logoutFunc()
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Admin Panel
                    </Typography>
                    <Button color="inherit" className={classes.logoutButton} onClick={() => logout()}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;