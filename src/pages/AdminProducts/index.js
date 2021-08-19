import React, { useEffect, useState } from "react";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ImageListItem from "@material-ui/core/ImageListItem";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import axios from "axios";
import {
  Button,
  Chip,
  ThemeProvider,
  IconButton,
  TextField,
  Dialog,
  InputAdornment,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(2),
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

export default function AdminProducts() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hasErrors, setErrors] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({});
  let history = useHistory();
  async function fetchData() {
    try {
      axios
        .get("http://localhost:5000/admin/products")
        .then(async (res) => {
          setProducts(res.data.products);
        })
        .catch((err) => {
          setErrors(true);
        });

      axios
        .get("http://localhost:5000/admin/category")
        .then(async (res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          setErrors(true);
        });
    } catch (err) {
      setErrors(true);
    }
  }
  // async function fetchData() {
  //   try {
  //     const products = require("../../data/products.json").products;
  //     setProducts(products);
  //     const categories = require("../../data/categories.json").categories;
  //     setCategories(categories);
  //   } catch (err) {
  //     setErrors(true);
  //   }
  // }

  useEffect(() => {
    fetchData();
    console.log(products);
  }, []);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  const handleProductDetail = (product) => {
    console.log(product);
    history.push(`/admin/products/${product.id}`, {
      product: product,
      categories: categories,
    });
  };

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
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20px" }}>#ID</TableCell>
                <TableCell style={{ width: "35px" }}>Hình</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell style={{ width: "50px" }}></TableCell>
                <TableCell style={{ width: "50px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  onClick={() => {
                    handleProductDetail(product);
                  }}
                  key={product.id}
                >
                  <TableCell align="right">{product.id}</TableCell>
                  <TableCell align="center">
                    <img
                      src={product.picture}
                      alt={product.name}
                      style={{ width: "100%" }}
                    />
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
