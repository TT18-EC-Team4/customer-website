import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    width: "1000px",
    margin: "0 auto"
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  media: {
    height: 0,
    paddingTop: "100%" // 16:9
  }
}));

export default function Products() {
  const classes = useStyles();

  const [hasErrors, setErrors] = useState(false);
  const [products, setProducts] = useState([]);

  async function fetchData(productId) {
    try {
      // const response = await fetch(`${process.env.REACT_APP_PRODUCTS_URL}`);
      // const products = await response.json();
      const products = require("../../data/products.json").products;
      const product = products.find(product => product.id === productId)
      setProducts(products);
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
        <Grid className={classes.grid} container spacing={3} justify="flex-start" alignItems="stretch">
          <Grid item container xs={6}>

          </Grid>
          <Grid item container xs={6}>

          </Grid>

        </Grid>
      )}
    </div>
  );
}
