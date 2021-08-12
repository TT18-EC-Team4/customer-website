import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import axios from "axios";
import { GlobalState } from "../../GlobalState";

//Import Pages
// import AuthenticationForm from "../../pages/Register";

//Import icons
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";

const drawerWidth = 238;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#fff",
    color: "#000",
  },
  mlauto: {
    marginLeft: "auto",
  },
  ml1: {
    marginLeft: "10px",
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
  },
}));

let Name;

export default function Header({history, location}) {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const handleLogout = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  return (
    <div>
      <Router>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.textbold} variant="h6">
              Fancy Store
            </Typography>
            {isLogged == 0 ? (
              <div className={classes.mlauto}>
                <Button href="/login" variant="outlined" color="primary">
                  Log in
                </Button>
                <Button
                  href="/register"
                  className={classes.ml1}
                  variant="outlined"
                  color="secondary"
                >
                  Sign up
                </Button>
              </div>
            ) : (
              <div className={classes.mlauto}>
                <Button
                  // onClick={(e) => setNamePage("Account")}
                  variant="contained"
                  color="primary"
                >
                  <PersonIcon /> {}
                </Button>
                <Button
                  onClick={handleLogout}
                  className={classes.ml1}
                  variant="contained"
                >
                  <ExitToAppIcon />
                </Button>
              </div>
            )}

            <IconButton
              className={clsx(classes.ml1, classes.textbold)}
              color="primary"
              component="span"
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.ml1, classes.textbold)}
              color="primary"
              component="span"
            >
              <ContactSupportIcon />
            </IconButton>
          </Toolbar>
          <Toolbar className={classes.nav}>
            <Switch>
              <Route path="/:namepage" children={<Child />} />
              <Route children={<Typography variant="h6">HOME</Typography>} />
            </Switch>

            <Button className={clsx(classes.mlauto, classes.textbold)} href="/">
              <HomeIcon />
            </Button>
            <Button
              className={clsx(classes.ml1, classes.textbold)}
              href="/products"
            >
              Products
            </Button>
            <Button
              className={clsx(classes.ml1, classes.textbold)}
              href="/orders"
            >
              Orders
            </Button>
            {/* <Button 
              className={clsx(classes.ml1, classes.textbold)} 
              href="/"
            >Delivery Refund</Button> */}
          </Toolbar>
        </AppBar>
      </Router>
    </div>
  );
}

function Child() {
  let { namepage } = useParams();
  return (
    <Typography
      variant="h6"
      style={{ textTransform: "capitalize", letterSpacing: "2px" }}
    >
      {namepage}
    </Typography>
  );
}
