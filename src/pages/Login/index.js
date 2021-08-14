import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  Typography,
  Button,
  Grid,
  Avatar,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import axios from "axios";
import Cookie, { set } from "js-cookie";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import "../Login/Login.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(3, 2),
  },
  media: {
    backgroundSize: "contain",
    margin: "2.5%",
    paddingTop: "56.25%", // 16:9
  },
  form: {
    margin: "0 auto",
    width: "500px",
    padding: "30px 20px",
  },
  headerStyle: {
    margin: 0,
  },
}));

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
      light: "#e33c05",
    },
    secondary: {
      main: "#d32f2f",
    },
  },
});

export default function Login({ location }) {
  const classes = useStyles();

  const [hasErrors, setErrors] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let productsOrder = location.state || [];

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        ...user,
      });
      console.log(res.headers);
      Cookie.set("refreshtoken", res.data.accesstoken);
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
      setErrors(err);
    }
  };

  return (
    <div className={classes.root}>
      <Header dataProductsOrder={productsOrder} />
      {hasErrors && (
        <Paper className={classes.paper}>
          <Typography component="p">
            An error has occurred, please try reloading the page.
          </Typography>
        </Paper>
      )}
      {!hasErrors && (
        <Grid className="content">
          <Paper className={classes.form} elevation={20}>
            <Grid align="center">
              <Avatar></Avatar>
              <h2>Sign Up</h2>
              <form
                onSubmit={handleOnSubmit}
                style={{ padding: "0px 60px 20px 60px" }}
              >
                <TextField
                  fullWidth
                  name="email"
                  label="Username"
                  placeholder="Enter your username/email address"
                  onChange={onChangeInput}
                />
                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  autoComplete="on"
                  label="Password"
                  placeholder="Enter your password"
                  onChange={onChangeInput}
                />
                <ThemeProvider theme={mainTheme}>
                  <Button type="submit" variant="contained" color="primary">
                    Sign In
                  </Button>
                </ThemeProvider>
              </form>

              <Typography variant="h6">
                "A reader lives a thousand lives before he dies"
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      )}
    </div>
  );
}
