import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from '@material-ui/core/Link';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    paddingTop: "64px",
    width: drawerWidth,
    backgroundColor: "#3e3847",
    color: "#fff",
  },
  drawerItem: {
    color: "#fff" 
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Admin Page
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List>
            <ListItem>
              <Link href="/"  color="inherit">
                Home
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/admin/products"  color="inherit">
                Products
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/admin/categories"  color="inherit">
                Categories
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </Router>
    </div>
  );
}