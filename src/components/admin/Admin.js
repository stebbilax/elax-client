import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Header from "./Header";
import Content from "./Content";
import Login from "./Login";

const useStyles = makeStyles(() => ({

}));


const Admin = () => {

    const [loggedIn, setLoggedIn] = useState(false);         //<<<------CHANGE
    const [token, setToken] = useState("");

    const turnOffLoading = () => {
        const loader = document.querySelector(".lds-ring-big")
        loader.style.transition = "1.5s";
        setTimeout(() => { loader.style.opacity = "0%"; }, 1000);

    }
    const turnOnLoading = () => {
        const loader = document.querySelector(".lds-ring-big")
        loader.style.transition = "0s";
        loader.style.opacity = "100%";
    }
    useEffect(() => {
        turnOffLoading();
    }, [])

    const loginUser = (token) => {
        setToken(token);
        setLoggedIn(true);
    }

    const logoutUser = () => {
        setToken("");
        setLoggedIn(false);
    }

    if (!loggedIn) {
        return <Login loginFunc={loginUser} />
    }

    return (
        <div className="admin">
            <Grid container direction="column">
                <Grid item>
                    <Header logoutFunc={logoutUser} />
                </Grid>
                <Grid item container>
                    <Grid item xs={0} sm={2} />
                    <Grid item xs={12} sm={8}>
                        <Content token={token} />
                    </Grid>
                    <Grid item xs={0} sm={2} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Admin;