import React, { useState, useEffect } from "react";
import axios from "axios";

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
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        const products = res.data.products;
        console.log(products);
        axios
          .get("http://localhost:5000/api/category")
          .then((res1) => {
            const temp = res1.data;
            for (let i in temp) {
              console.log("Hello");
              let productsCategory = [];
              for (let j in products) {
                const found = products[j].category.find(
                  (element) => element === temp[i].name
                );
                if (found !== undefined) {
                  productsCategory.push(products[j]);
                }
              }
              List.set(temp[i].name, productsCategory);
            }
            console.log(List);
            console.log(temp);
            var listcategory = [];
            for (let i in temp) {
              console.log(temp[i].name);
              listcategory = [...listcategory, temp[i].name];
            }
            console.log(listcategory);
            setCategories(listcategory);
          })
          .catch((err) => {
            setErrors(true);
          });
      })
      .catch((err) => {
        setErrors(true);
      });
  }

  useEffect(() => {
    fetchData();
    console.log(categories, List);
  }, []);

  const handleSeeMore = (category) => {
    setSeeMore(category);
  }

  const handleSeeLess = () => {
    setSeeMore("");
  }

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
        <div className="content">
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
                    <Button onClick={handleSeeLess} variant="contained" className="btn-see" >
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
            );
          })}
          <CardShoppingIcon dataProductsOrder={productsOrder} />
        </div>
      )}
    </div>
  );
}
