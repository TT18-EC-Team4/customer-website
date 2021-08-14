import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import {
  Button,
  Grid,
  Avatar,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import axios from 'axios';
import Header from "../Header";
import "../Register/Register.scss";
import { useLocation } from "react-router-dom";

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

export default function Register({ location }) {
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  let productsOrder = location.state || [];

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.password === user.password2) {
        await axios.post("http://localhost:5000/user/register", { ...user });

        localStorage.setItem("firstLogin", true);

        window.location.href = "/";
      }
    } catch (err) {
      alert(err.response.data.msg);
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
              <form onSubmit={handleOnSubmit} style={{ padding: "0px 60px 20px 60px" }}>
                <TextField
                  fullWidth
                  name="name"
                  label="Username"
                  placeholder="Enter your username"
                  onChange={onChangeInput}
                />
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  placeholder="abc@example.com"
                  onChange={onChangeInput}
                />
                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Minimum 4 characters"
                  onChange={onChangeInput}
                />
                <TextField
                  fullWidth
                  name="password2"
                  type="password"
                  label="Password confirmation"
                  placeholder="Re-enter your password"
                  onChange={onChangeInput}
                />
                <ThemeProvider theme={mainTheme}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
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
