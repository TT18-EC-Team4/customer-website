import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { Divider, ListItemIcon, SvgIcon } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import React, { Component, useState }  from 'react';
import { Button } from "@material-ui/core";
import clsx from 'clsx';

//Import icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import { auto } from "@popperjs/core";

//Import Pages


const drawerWidth = 238;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#fff",
    color: '#000',
  },
  mlauto: {
    marginLeft: 'auto',
  },
  ml1: {
    marginLeft: '10px',
  }
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const [checklogin, setchecklogin] = useState(0);

  const handleSignin = () => {
    setchecklogin(1);
  };

  const handleSignup = () => {
    setchecklogin(1);
  };

  const handleLogout = () => {
    setchecklogin(0);
  };

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" >
              Fancy Store
            </Typography>
            {checklogin == 0 ? (
              <div className={classes.mlauto}>
                <Button onClick={handleSignin} variant="outlined" color="primary">
                  Log in
                </Button>
                <Button className={classes.ml1} variant="outlined" color="secondary">
                  Sign up
                </Button>
              </div>
            ) : (
              <div className={classes.mlauto} > 
                <Button variant="contained" color="primary">
                  <PersonIcon /> dkmnhat
                </Button>
                <Button onClick={handleLogout} className={classes.ml1} variant="contained">
                  <ExitToAppIcon />
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Router>
    </div>
  );
}
