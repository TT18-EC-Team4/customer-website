import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box, CardHeader } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    margin: "0 auto",
    width: "100%"
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  media: {
    backgroundSize: 'contain',
    margin: "2.5%",
    paddingTop: "56.25%" // 16:9
  }
}));

export default function Products({ match }) {
  const classes = useStyles();
  
  const [hasErrors, setErrors] = useState(false);
  const [product, setProduct] = useState({});
  
  const productId = match.params.id;
    
  async function fetchProduct(productId) {
    try {
    // const response = await fetch(
    //   `${process.env.REACT_APP_ORDERS_URL}/${orderId}`
    // );
    // const order = await response.json();
      const products = require("../../data/products.json").products;
      const product = products.find(product => product.id === productId);     
      setProduct(product);
    } catch (err) {
      setErrors(true);
    }
  }
  
    useEffect(() => {
      fetchProduct(productId);
    }, [productId]);
  
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
          <Grid className={classes.grid} container spacing={3} direction="row" justifyContent="flex-start" alignItems="flex-start">
            <Grid item sm={1}>
              <img src={product.picture} alt="" height="999px" width="1000px"/>
              <Typography variant="h5">{product.name}</Typography>
              
            </Grid>
          </Grid>
    )    
}
</div>);
}