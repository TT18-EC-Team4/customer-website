import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, {  }  from 'react';

//Import icons

import {
  BrowserRouter as Router,
  Route,
  Switch} from "react-router-dom";

//Import Pages
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Products from "../../pages/Products";
import ProductDetail from "../../pages/ProductDetail"
import Orders from "../../pages/Orders";
import OrderDetails from "../../pages/OrderDetails";
import NotFound from "../../pages/NotFound";
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
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
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
