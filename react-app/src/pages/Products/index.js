/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.import React from "react";
*/
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CardHeader } from "@material-ui/core";

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
  },
  titleStyle: {
    fontSize: "13.5px",
    fontWeight: "bold",
    alignContent: "center"
  },
  titleContainer: {
    backgroundColor: "yellow",
    padding:"2%", 
    borderBottom: '1px solid black',
    textAlign: "center",
  },
  contentContainer: {
    
    textAlign: "center",
    borderTop: '1px solid black',
    alignItems: "center",
    fontWeight: "bold",
    '&:last-child': { 
      padding: "2%", 
    }
  },
  cardContainer: {
    borderRadius: "8px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderCollapse: "separate"
  }
}));

export default function Products({history}) {
  const classes = useStyles();
  
  const [hasErrors, setErrors] = useState(false);
  const [products, setProducts] = useState([]);

  async function fetchData(productId) {
    try {
      // const response = await fetch(`${process.env.REACT_APP_PRODUCTS_URL}`);
      // const products = await response.json();
      const products = require("../../data/products.json").products;
      // const product = products.find((product) => product.id === productId);
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
        <Grid className={classes.grid} container spacing={3} direction="row" justifyContent="flex-start" alignItems="flex-start">
          {products.map(product => {
            return (
              <Grid key={product.id} item lg={2} md={3} xs={6} >
                <Card
                  onClick={() => {
                    history.push(`/products/${product.id}`);
                  }}
                  className={classes.cardContainer}
                  variant="outlined" 
                  elevation={10}>
                  <CardHeader 
                    classes={{title: classes.titleStyle}}
                    className={classes.titleContainer}
                    title={product.name}/>
                  <CardMedia
                    className={classes.media}
                    image={`${product.picture}/preview.jpg`}
                    title={product.name}
                  />
                  <CardContent 
                    style={{backgroundColor: product.quantity > 0 ? "green" : "red"}}
                    className={classes.contentContainer}>
                      {product.quantity > 0 ? "AVAILABLE" : "UNAVAILABLE"}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}
