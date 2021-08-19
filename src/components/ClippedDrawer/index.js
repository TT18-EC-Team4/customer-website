import React, { useState, useEffect } from "react";
//Import Pages
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Products from "../../pages/Products";
import ProductDetail from "../../pages/ProductDetail";
import Orders from "../../pages/Orders";
import OrderDetails from "../../pages/OrderDetails";
import NotFound from "../../pages/NotFound";
import BookingConfirmation from "../../pages/BookingConfirmation";
import BookingCheckout from "../../pages/CheckOut";
import AdminPage from "../../pages/AdminPage";
import AdminProductDetail from "../../pages/AdminProductDetail";
import AdminProducts from "../../pages/AdminProducts";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function ClippedDrawer() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/admin/:page" component={AdminPage} />
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/order/confirmation" component={BookingConfirmation} />
          <Route path="/order/checkout" component={BookingCheckout} />
          <Route path="/orders/:id" component={OrderDetails} />
          <Route path="/orders" component={Orders} />
          <Route exact path="/admin/products" component={AdminProducts} />
          <Route path="/admin/products/:id" component={AdminProductDetail} />
          <Route component={NotFound} />
        </Switch>
        {/* </main> */}
      </Router>
    </div>
  );
}
