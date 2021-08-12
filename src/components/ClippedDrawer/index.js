import React, { Component, useState }  from 'react';

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
import AdminPage from "../../pages/AdminPage"

export default function ClippedDrawer() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/admin/:page" component={AdminPage} />
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/order/confirmation" component={BookingConfirmation} />
          <Route path="/order/checkout" component={BookingCheckout} />
          <Route path="/orders/:id" component={OrderDetails} />
          <Route path="/orders" component={Orders} />
          <Route component={NotFound} />
        </Switch>
        {/* </main> */}
      </Router>
    </div>
  );
}
