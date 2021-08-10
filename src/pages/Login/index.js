import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import { Button, Grid, Avatar, TextField, ThemeProvider, Chip, FormLabel, Box, FormControl, InputLabel, Input } from "@material-ui/core";
import {Row, Col, Image, ListGroup, Carousel, Form} from "react-bootstrap"; 
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { createTheme } from '@material-ui/core/styles';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    margin: "0 auto"
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  media: {
    backgroundSize: 'contain',
    margin: "2.5%",
    paddingTop: "56.25%" // 16:9
  },
  form: {
    margin: "0 auto",
    width: '500px',
    padding: '30px 20px'
  },
  headerStyle: {
    margin: 0
  }
}));

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
      light: "#e33c05"
    },
    secondary: {
      main: "#d32f2f"
    },
  }
})



export default function AuthenticationForm({ match }) {
  const classes = useStyles();
  
  const [hasErrors, setErrors] = useState(false);
  const [product, setProduct] = useState({});
  
//   const productId = match.params.id;
    
//   async function fetchProduct(productId) {
//     try {
//     // const response = await fetch(
//     //   `${process.env.REACT_APP_ORDERS_URL}/${orderId}`
//     // );
//     // const order = await response.json();
//       const products = require("../../data/products.json").products;
//       const product = products.find(product => product.id === productId);     
//       setProduct(product);
      
//     } catch (err) {
//       setErrors(true);
//     }
//   }
  
//     useEffect(() => {
//       fetchProduct(productId);
//     }, [productId]);

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
                <Avatar>

                </Avatar>
                <h2>Sign Up</h2>
                <form style={{padding: '0px 60px 20px 60px'}}>
                  <TextField fullWidth label='Username' placeholder='Enter your username/email address'/>
                  <TextField fullWidth label='Password' placeholder='Enter your password'/>
                  <ThemeProvider theme={mainTheme}>
                    <Button type='submit' variant="contained" color="primary">Sign In</Button>
                  </ThemeProvider>
                </form>

                <Typography variant="h6">
                  "A reader lives a thousand lives before he dies"
                </Typography>

              </Grid>

            </Paper>
          </Grid>
        )
}
</div>);
}