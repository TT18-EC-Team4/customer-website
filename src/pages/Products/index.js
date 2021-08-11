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
import clsx from 'clsx';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CardHeader, Button } from "@material-ui/core";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
// import { useHistory } from "react-router-dom";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    margin: "0 auto",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(3, 2),
  },
  media: {
    backgroundSize: "contain",
    margin: "2.5%",
    paddingTop: "56.25%", // 16:9
  },
  titleStyle: {
    fontSize: "13.5px",
    fontWeight: "bold",
    alignContent: "center",
  },
  titleContainer: {
    backgroundColor: "yellow",
    padding: "2%",
    borderBottom: "1px solid black",
    textAlign: "center",
  },
  contentContainer: {
    textAlign: "center",
    borderTop: "1px solid black",
    alignItems: "center",
    fontWeight: "bold",
    "&:last-child": {
      padding: "2%",
    },
  },
  cardContainer: {
    borderRadius: "3px",
    border: "1px solid #f2f2f2",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  },
  bodyBtnOrder: {
    position: "fixed",
    right: 0,
    bottom: 0,
    marginRight: '30px',
    marginBottom: '30px',
    boxShadow: '0 0 5px rgba(0, 0, 0.3)',
    height: '66px',
    width: '66px',
    borderRadius: '33px',
  },
  btnOrder: {
    height: '66px',
    width: '66px',
    borderRadius: '33px',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  selectbody: {
    width: "20%",
    marginRight: "20px",
    backgroundColor: "#fff",
    padding: "15px",
    marginTop: "8px",
  }
}));

const CustomButton = withStyles((theme) => ({
  root: {
    borderRadius: "20px",
    border: "1px black solid",
    fontSize: 25,
    fontWeight: "bold",
    padding: "10px 30px",

    color: theme.palette.getContrastText("#FFEB3B"),
    backgroundColor: "#FFEB3B",
    "&:hover": {
      backgroundColor: "#FFA700",
    },
  }
}))(Button);

let wlist = new Map();

export default function Products({ history, location }) {
  
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [Listcategories, setListcategories] = useState([]);

  const handleChange = (event) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked });
  };
  console.log(categories);
  async function fetchData(productId) {
    try {
      // const response = await fetch(`${process.env.REACT_APP_PRODUCTS_URL}`);
      // const products = await response.json();
      const products = require("../../data/products.json").products;
      const listcategory = require("../../data/categories.json").categories;
      // const product = products.find((product) => product.id === productId);
      setProducts(products);
      const categoryArray = {};
      for (let i in listcategory)
      {
        categoryArray[listcategory[i]] = false;
      }
      categoryArray["All"] = true;
      setListcategories(listcategory);
      setCategories(categoryArray);
    } catch (err) {
      setErrors(true);
    }
  }
  useEffect(() => {
    fetchData();
    if (location.state) {
      if (!wlist.has(location.state)) {
        wlist.set(location.state, 1);
      }
      else {
        wlist.set(location.state, wlist.get(location.state) + 1)
      }
      console.log(wlist) 
    }
    // eslint-disable-next-line
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
        <div style={{display: "flex"}}>
          <div className={clsx(classes.cardContainer, classes.selectbody)}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Categories</FormLabel>
              <FormGroup>
                {Listcategories.map((category) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox onChange={handleChange} name={category} />}
                      label={category}
                    />
                  )
                })}
                <FormControlLabel
                  control={<Checkbox checked={categories["All"] == true ? true : false} onChange={handleChange} name="All" />}
                  label="All"
                />
              </FormGroup>
            </FormControl>
          </div>
          <Grid
            className={classes.grid}
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {products.map((product) => {
              let ok = 0;
              for (let i in product.category)
              {
                  if (categories[product.category[i]] == true)
                  {
                    ok = 1;
                    break;
                  }
              }
              if (ok == 0 && categories["All"] == false) {
                return;
              }
              return (
                <Grid key={product.id} item style={{ width: "20%"}}>
                  <Card
                    onClick={() => {
                      history.push(`/products/${product.id}`);
                    }}
                    className={classes.cardContainer}
                    variant="outlined"
                    elevation={10}
                    title={product.name}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`${product.picture}/preview.jpg`}
                        title={product.name}
                      />
                      <CardContent 
                        style={{
                          borderTop: "1px solid #f3f3f3",
                          backgroundColor: product.quantity > 0 ? "#fff" : "#f1f1f1",
                        }}
                      >
                        <Typography 
                          variant="body1" 
                          style={{
                            fontSize: "16px", fontWeight: "bold", textAlign: "left",
                          }}
                          noWrap
                        >
                          {product.name}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          style={{
                            fontSize: "13px",  color: "#787878", textAlign: "left",
                          }}
                          noWrap
                        >
                          {product.author}
                        </Typography>
                        <div style={{display: "flex", marginTop: "10px"}}>
                          <Typography 
                            variant="body2" 
                            style={{
                              fontSize: "13px", fontWeight: "bold", textAlign: "left", marginRight: "auto",
                            }}
                            color={product.quantity > 0 ? "primary" : "secondary"}
                          >
                            {product.quantity > 0 ? "AVAILABLE" : "UNAVAILABLE"}
                          </Typography>
                          <Typography 
                            gutterBottom 
                            variant="body1" 
                            style={{
                              fontSize: "13px",  textAlign: "right",
                            }}
                            noWrap
                          >
                            {product.cost}
                          </Typography>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      <div className={classes.bodyBtnOrder}>
        {wlist.size  == 0 ? (
          <Button className={classes.btnOrder} variant="contained" color="secondary">
            <AddShoppingCartIcon />
          </Button>
        ) : (
        <Button onClick={() => {history.push("/order/confirmation", wlist)}} className={classes.btnOrder} variant="contained" color="secondary">
          {wlist.size}
        </Button>
        )}
      </div>
    </div>
  );  
}