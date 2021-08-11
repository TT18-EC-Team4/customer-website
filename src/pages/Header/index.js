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
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import clsx from 'clsx';
import { Link } from "react-router-dom";

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

//Import icons
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
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
  NavLink,
  useParams
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
  },
  nav: {
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    paddingLeft: "50px",
  },
  textbold: {
    fontWeight: "bold",
  },
  btnSm: {
    width: "30px", 
  }
}));

let Name;

export default function ClippedDrawer({history, location}) {
  const classes = useStyles();
  const [checklogin, setchecklogin] = useState(0);
  const handleLogin = () => {
    setchecklogin(1);
    // setNamePage("Log in");
  };

  const handleSignup = () => {
    setchecklogin(1);
    // setNamePage("Sign up");
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
            <Typography className={classes.textbold} variant="h6" >
              Fancy Store
            </Typography>
            {checklogin == 0 ? (
              <div className={classes.mlauto}>
                <Button 
                  onClick={handleLogin} 
                  variant="outlined" 
                  color="primary"
                >
                  Log in
                </Button>
                <Button onClick={handleSignup}  className={classes.ml1} variant="outlined" color="secondary">
                  Sign up
                </Button>
              </div>
            ) : (
              <div className={classes.mlauto} > 
                <Button 
                  // onClick={(e) => setNamePage("Account")}
                  variant="contained" 
                  color="primary"
                >
                  <PersonIcon /> dkmnhat
                </Button>
                <Button onClick={handleLogout} className={classes.ml1} variant="contained">
                  <ExitToAppIcon />
                </Button>
              </div>
            )}
            
            <IconButton className={clsx(classes.ml1, classes.textbold)} color="primary" component="span">
              <SettingsIcon/>
            </IconButton>
            <IconButton className={clsx(classes.ml1, classes.textbold)} color="primary" component="span">
              <ContactSupportIcon/>
            </IconButton>
          </Toolbar>
          <Toolbar className={classes.nav}>
            <Switch>
              <Route path="/:namepage" children={<Child />} />
              <Route children={
                <Typography variant="h6" >
                  HOME
                </Typography>
              } />
            </Switch>
            
            <Button 
              className={clsx(classes.mlauto, classes.textbold)} 
              href="/"
            ><HomeIcon/></Button>
            <Button 
              className={clsx(classes.ml1, classes.textbold)} 
              href="/products"
            >Products</Button>
            <Button 
              className={clsx(classes.ml1, classes.textbold)} 
              href="/orders"
            >Orders</Button>
            <Button 
              className={clsx(classes.ml1, classes.textbold)} 
              href="/"
            >Delivery Refund</Button>
          </Toolbar>
        </AppBar>
      </Router>
    </div>
  );
}

function Child() {
  let { namepage } = useParams();
  return (
    <Typography variant="h6" style={{textTransform: "capitalize", letterSpacing: "2px"}}>
      {namepage}
    </Typography>
  );
}