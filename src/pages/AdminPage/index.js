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
import React, { Component, useState } from "react";

//Import icons
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CategoryIcon from "@material-ui/icons/Category";
import PeopleIcon from "@material-ui/icons/People";
import ReceiptIcon from "@material-ui/icons/Receipt";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";

import NotFound from "../NotFound";
import AdminProductDetail from "../AdminProductDetail";
import AdminProducts from "../AdminProducts";
import HeaderAminPage from "../HeaderAminPage";
import AdminCategories from "../AdminCategories";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    paddingTop: "80px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
  },
}));

export default function AdminPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HeaderAminPage />
      <div className={classes.content}>
        <Switch>
          <Route exact path="/admin/products" component={AdminProducts} />
          <Route path="/admin/products/:id" component={AdminProductDetail} />
          <Route exact path="/admin/categories" component={AdminCategories} />
        </Switch>
      </div>
    </div>
  );
}
