/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.import React from "react";
*/
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

//Import icons
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleIcon from '@material-ui/icons/People';
import ReceiptIcon from '@material-ui/icons/Receipt';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";

//Import Pages
import Home from "../../pages/Home";
import Products from "../../pages/Products";
import ProductDetail from "../../pages/ProductDetail"
import Orders from "../../pages/Orders";
import OrderDetails from "../../pages/OrderDetails";
import NotFound from "../../pages/NotFound";
// import AuthenticationForm from "../../pages/Register";
import BookingConfirmation from "../../pages/BookingConfirmation"
import BookingCheckout from "../../pages/CheckOut"
import Header from "../../pages/Header"

const drawerWidth = 238;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  logo: {
    maxHeight: "60px",
    marginRight: theme.spacing(1)
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    background: "#363740",
    width: drawerWidth
  },
  drawerItem: {
    color: "rgba(0, 0, 0, 0.54)"
  },
  content: {
    flexGrow: 1,
    paddingTop: "100px",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "50px"
  },
  toolbar: theme.mixins.toolbar,
  navContent: {
    color: '#000'
  }
}));



export default function ClippedDrawer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/order/confirmation" component={BookingConfirmation} />
            <Route path="/order/checkout" component={BookingCheckout} />
            <Route path="/orders/:id" component={OrderDetails} />
            <Route path="/orders" component={Orders} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}
