import React, { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//import pages
import Header from "../../pages/Header";
import ShowProductGrid from "../ShowProductGrid";
import CardShoppingIcon from "../CardShoppingIcon";

import "../Products/Products.scss";
import { useLocation } from "react-router-dom";
// import { Pagination } from "@material-ui/lab";
import Pagination from "../../components/Pagination";

// let List = new Map();

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 2),
  },
}));

export default function Products() {
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);

  let location = useLocation();
  let productsOrder = location.state || [];
  console.log(productsOrder);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [Listcategories, setListcategories] = useState([]);

  const handleChange = (event) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked });
  };

  async function fetchData() {
    axios
      .get("http://localhost:5000/user/products")
      .then((res) => {
        const products = res.data.products;
        setProducts(products);
      })
      .catch((err) => {
        setErrors(true);
      });
    axios
      .get("http://localhost:5000/user/category")
      .then((res1) => {
        const cat = res1.data;
        const categoryArray = {};
        const listCategory = [];
        for (let i in cat) {
          categoryArray[cat[i].name] = false;
          listCategory.push(cat[i].name);
        }
        categoryArray["All"] = true;
        console.log(listCategory, categoryArray);
        setListcategories(listCategory);
        setCategories(categoryArray);
      })
      .catch((err) => {
        setErrors(true);
      });
  }

  useEffect(() => {
    fetchData();
  }, [filter]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });

  const [filter, setFilter] = useState({
    _limit: 10,
    _page: 1,
  });

  function handlePageChange(newPage) {
    console.log("NewPage:", newPage);
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
          <div className="d-flex">
            <div className="mr-2">
              <FormControl component="fieldset" className="card-container">
                <FormLabel
                  component="legend"
                  className="font-weight-bold text-muted"
                >
                  Categories
                </FormLabel>
                <FormGroup>
                  {Listcategories.map((category) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox onChange={handleChange} name={category} />
                        }
                        label={category}
                      />
                    );
                  })}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories["All"] === true ? true : false}
                        onChange={handleChange}
                        name="All"
                      />
                    }
                    label="All"
                  />
                </FormGroup>
              </FormControl>
            </div>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
          <CardShoppingIcon dataProductsOrder={productsOrder} />
        </div>
      )}
    </div>
  );
}

{
  /* <Grid
              className="mx-auto"
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {products.map((product) => {
                let ok = 0;
                for (let i in product.category) {
                  if (categories[product.category[i]] === true) {
                    ok = 1;
                    break;
                  }
                }
                if (ok === 0 && categories["All"] === false) {
                  return;
                }
                return (
                  <ShowProductGrid
                    dataProduct={product}
                    dataProductsOrder={productsOrder}
                  />
                );
              })}
            </Grid> */
}
