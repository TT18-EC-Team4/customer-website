import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
//import pages
import Header from "../../pages/Header";
import ShowProductGrid from "../ShowProductGrid";
import CardShoppingIcon from "../CardShoppingIcon";
//import scss
import "../Home/Home.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 2),
  },
}));

const List = new Map();

export default function Home({ location }) {
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);
  const productsOrder = location.state || [];
  const [seeMore, setSeeMore] = useState("");
  const [categories, setCategories] = useState([]);
  const color = [
    "#03a9f4",
    "#8bc34a",
    "#ff9800",
    "#009688",
    "#3f51b5",
    "#f44336",
  ];

  async function fetchData() {
    axios
      .get("http://localhost:5000/user/products")
      .then((res) => {
        const products = res.data.products;
        axios
          .get("http://localhost:5000/user/category")
          .then((res1) => {
            const cat = res1.data;
            let cnt = 0;
            let catArr = [];
            for (const i in cat) {
              catArr.push({ id: cnt, name: cat[i].name });
              cnt++;
              let productsCategory = [];
              for (let j in products) {
                const found = products[j].category.find(
                  (element) => element === cat[i].name
                );
                if (found !== undefined) {
                  productsCategory.push(products[j]);
                }
              }
              List.set(cat[i].name, productsCategory);
            }
            setCategories(catArr);
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
  }, []);

  const handleSeeMore = (category) => {
    setSeeMore(category);
  };

  const handleSeeLess = () => {
    setSeeMore("");
  };

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
                  backgroundColor: color[category.id % 6],
                }}
              >
                <div style={{ width: "40%", textAlign: "center" }}>
                  <Typography
                    style={{ textTransform: "uppercase", fontWeight: "bolder" }}
                    variant="h3"
                    gutterBottom
                  >
                    {category.name}
                  </Typography>
                  {seeMore == category.name ? (
                    <Button
                      onClick={handleSeeLess}
                      variant="contained"
                      className="btn-see"
                    >
                      See less
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSeeMore(category.name)}
                      variant="contained"
                      className="btn-see"
                    >
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
                  {List.get(category.name).length == 0 ? (
                    <Typography variant="h6" className="mx-auto">
                      No product
                    </Typography>
                  ) : (
                    List.get(category.name).map((product) => {
                      if (
                        List.get(category.name).indexOf(product) >= 4 &&
                        category.name != seeMore
                      ) {
                        return;
                      }
                      return (
                        <ShowProductGrid
                          dataProduct={product}
                          dataProductsOrder={productsOrder}
                        />
                      );
                    })
                  )}
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
