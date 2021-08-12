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

export default function AuthenticationForm({ match }) {
  const classes = useStyles();

  const [hasErrors, setErrors] = useState(false);
  const [product, setProduct] = useState({});

  return (
    <div className={classes.root}>
      {hasErrors && (
        <Paper className={classes.paper}>
          <Typography component="p">
            An error has occurred, please try reloading the page.
          </Typography>
        </Paper>
      )}
      {!hasErrors && (
        <Grid>
          <Paper className={classes.form} elevation={20}>
            <Grid align="center">
              <Avatar></Avatar>
              <h2>Sign Up</h2>
              <form style={{ padding: "0px 60px 20px 60px" }}>
                <TextField
                  fullWidth
                  label="Username"
                  placeholder="Enter your username/email address"
                />
                <TextField
                  fullWidth
                  label="Password"
                  placeholder="Enter your password"
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
