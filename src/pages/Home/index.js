import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
//import pages
import Header from "../../pages/Header"
import ShowProductGrid from "../ShowProductGrid";
import CardShoppingIcon from "../CardShoppingIcon";
//import scss
import "../Home/Home.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 2),
  },
  content: {
    paddingTop: "150px",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "50px"
  }
}));

let List = new Map();

export default function Home(location) {
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);
  const productsOrder = location.state || [];

  const [seeMore, setSeeMore] = useState("");
  const [categories, setCategories] = useState([]);
  const color = ["#03a9f4", "#8bc34a", "#ff9800", "#009688", "#3f51b5", "#f44336"];

  async function fetchData() {
    try {
      const products = require("../../data/products.json").products;
      const categories = require("../../data/categories.json").categories;
      setCategories(categories);
      for (let i in categories) {
        let productsCategory = [];
        for (let j in products) {
          const found = products[j].category.find(element => element == categories[i]);
          if (found != undefined) {
            productsCategory.push(products[j]);
          }
        }
        List.set(categories[i], productsCategory);
      }
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeeMore = (category) => {
    setSeeMore(category);
  }

  const handleseeless = () => {
    setSeeMore("");
  }

  console.log(categories, List);
  return (
    <div>
      <Header dataProductsOrder={productsOrder} />
      {hasErrors && (
        <Paper className={classes.paper}>
          <Typography component="p">
            An error has occurred, please try reloading the page.
          </Typography>
        </Paper>
      )}
      {!hasErrors && (
        <div className={classes.content}>
          {categories.map((category) => {
            return (
              <div
                className="content-category"
                style={{
                  backgroundColor: color[categories.indexOf(category) % 6],
                }}
              >
                <div style={{ width: "40%", textAlign: "center" }}>
                  <Typography style={{ textTransform: "uppercase", fontWeight: "bolder" }} variant="h3" gutterBottom>
                    {category}
                  </Typography>
                  {seeMore == category ? (
                    <Button onClick={handleseeless} variant="contained" className="btn-see" >
                      See less
                    </Button>
                  ) : (
                    <Button onClick={() => handleSeeMore(category)} variant="contained" className="btn-see" >
                      See more
                    </Button>
                  )}
                </div>
                <Grid
                  className="mx-auto"
                  container
                  spacing={3}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {List.get(category).length == 0 ? (
                    <Typography variant="h6" className="mx-auto">
                      No product
                    </Typography>
                  ) : List.get(category).map((product) => {
                    if (List.get(category).indexOf(product) >= 4 && category != seeMore) {
                      return;
                    }
                    return (
                      <ShowProductGrid dataProduct={product} dataProductsOrder={productsOrder} />
                    );
                  })}
                </Grid>
              </div>
            )
          })}
          <CardShoppingIcon dataProductsOrder={productsOrder} />
        </div>
      )}
    </div>
  );
}
