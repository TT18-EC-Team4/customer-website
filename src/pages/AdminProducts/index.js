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
  const [currentCat, setCurrentCat] = useState([]);
  const [hasErrors, setErrors] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({
    id: "",
    name: "",
    cost: "",
    author: "",
    publishedYear: "",
    picture: "",
    category: [],
    quantity: "",
  });
  let history = useHistory();

  const handleClose = () => {
    setCurrentCat([]);
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const handleProductDetail = (product) => {
    console.log(product);
    history.push(`/admin/products/${product.id}`, {
      product: product,
      categories: categories,
    });
  };

  const handleChangeCat = (e) => {
    console.log(e.target.name);
    console.log(e.target.checked);
    if (e.target.checked) {
      let temp = currentCat;
      temp.push(e.target.name);
      console.log(temp);
      setCurrentCat(temp);
    } else {
      let temp = currentCat.filter((item) => item !== e.target.name);
      console.log(temp);
      setCurrentCat(currentCat.filter((item) => item !== e.target.name));
    }
  };

  const handleNewProduct = () => {
    const temp = { ...current, category: currentCat };
    console.log(temp);
    setCurrent({ ...current, category: currentCat });
    try {
      axios
        .post("http://localhost:5000/admin/products", { ...temp })
        .then(async (res) => {
          alert(res.data.msg);
        })
        .catch((err) => {
          setErrors(true);
        });
    } catch (err) {
      setErrors(true);
    }
    setOpen(false);
  };

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
    console.log(current);
  }, [open]);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

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
        <Paper style={{ width: "100%" }} elevation={0}>
          <Paper
            style={{ textAlign: "right", marginBottom: "0.75%" }}
            elevation={0}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={openDialog}
            >
              Add new product
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              BackdropProps={{
                style: { backgroundColor: "transparent" },
              }}
            >
              <form style={{ padding: "20px 60px 20px 60px" }}>
                <TextField
                  fullWidth
                  name="id"
                  label="Book's ID"
                  onChange={(val) => {
                    setCurrent({
                      ...current,
                      id: val.target.value,
                    });
                  }}
                />
                <TextField
                  fullWidth
                  name="title"
                  label="Book's Title"
                  onChange={(val) => {
                    setCurrent({
                      ...current,
                      name: val.target.value,
                    });
                  }}
                />
                <TextField
                  fullWidth
                  name="cost"
                  label="Book's Cost"
                  onChange={(val) => {
                    setCurrent({
                      ...current,
                      cost: val.target.value,
                    });
                  }}
                />
                <TextField
                  fullWidth
                  name="author-name"
                  label="Book's Author"
                  onChange={(val) => {
                    setCurrent({
                      ...current,
                      author: val.target.value,
                    });
                  }}
                />
                <TextField
                  fullWidth
                  name="published-year"
                  label="Year of Publication"
                  onChange={(val) => {
                    setCurrent({
                      ...current,
                      publishedYear: val.target.value,
                    });
                  }}
                />
                <TextField
                  fullWidth
                  name="picture"
                  label="Link of Picture"
                  onChange={(val) => {
                    setCurrent({
                      ...current,
                      picture: val.target.value,
                    });
                  }}
                />
                <TextField
                  fullWidth
                  name="quantity"
                  label="Book's quantity"
                  style={{ marginBottom: "10px" }}
                  onChange={(val) => {
                    setCurrent({
                      ...current,
                      quantity: parseInt(val.target.value),
                    });
                  }}
                />
                <FormControl className={classes.formControl}>
                  <FormGroup row={true}>
                    {categories
                      ? categories.map((item) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={handleChangeCat}
                                name={item.name}
                              />
                            }
                            label={item.name}
                          />
                        ))
                      : null}
                  </FormGroup>
                </FormControl>
                <ThemeProvider theme={mainTheme}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    onClick={handleNewProduct}
                  >
                    Add new
                  </Button>
                </ThemeProvider>
              </form>
            </Dialog>
          </Paper>
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
        </Paper>
      )}
    </div>
  );
}
