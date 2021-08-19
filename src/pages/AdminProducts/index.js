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
import axios from "axios";
import {
  Button,
  Chip,
  ThemeProvider,
  IconButton,
  TextField,
  Dialog,
  InputAdornment,
} from "@material-ui/core";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  const firstFetch = require("../../data/products.json").products;
  const [products, setProducts] = useState(firstFetch);
  const [hasErrors, setErrors] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({});

  // async function fetchData() {
  //   try {
  //     const products = require("../../data/products.json").products;
  //     setProducts(products);
  //   } catch (err) {
  //     setErrors(true);
  //   }
  // }

  // async function fetchData() {
  //   axios
  //     .get("http://localhost:5000/admin/products")
  //     .then((res) => {
  //       return res.data.products;
  //     })
  //     .catch((err) => {
  //       setErrors(true);
  //     });
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleClickOpen = (product) => {
    console.log(products);
    setCurrent(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveEdit = () => {
    setOpen(false);
    let temp = products;
    for (let i in temp) {
      if (!temp[i].id.localeCompare(current.id)) {
        temp[i].name = current.name;
        temp[i].author = current.author;
        temp[i].publishedYear = current.publishedYear;
        setProducts(temp);
      }
    }
  };

  // const handleDeleteCat = (item) => {
  //   console.log(item);
  //   let temp = products;
  //   for (let i in temp) {
  //     if (temp[i] === current) {
  //       temp[i].category = temp[i].category.filter((cat) => cat !== item);
  //       console.log(temp[i].category);
  //       setCurrent(temp[i]);
  //       break;
  //     }
  //   }
  //   setProducts(temp);
  // };

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
                <TableRow key={product.id}>
                  <TableCell align="right">{product.id}</TableCell>
                  <TableCell align="center">
                    <img
                      src={product.picture}
                      alt={product.name}
                      style={{ width: "100%" }}
                    />
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="secondary">
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickOpen(product)}
                    >
                      Edit
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
                          name="title"
                          label="Name of Book"
                          placeholder={current.name}
                          onChange={(val) => {
                            setCurrent({ ...current, name: val.target.value });
                          }}
                        />
                        <TextField
                          fullWidth
                          name="author-name"
                          label="Author of Book"
                          placeholder={current.author}
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
                          label="Published Year of Book"
                          placeholder={current.publishedYear}
                          onChange={(val) => {
                            setCurrent({
                              ...current,
                              publishedYear: val.target.value,
                            });
                          }}
                          style={{ marginBottom: "10px" }}
                        />
                        {/* {current.category
                          ? current.category.map((item) => (
                              <Chip
                                label={item}
                                onDelete={() => handleDeleteCat(item)}
                              />
                            ))
                          : null}
                        <TextField
                          style={{ width: "30%", marginLeft: "5px" }}
                          name="new-tag"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton>
                                  <AddIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        /> */}
                        <ThemeProvider theme={mainTheme}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: "10px" }}
                            onClick={handleSaveEdit}
                          >
                            Finalize
                          </Button>
                        </ThemeProvider>
                      </form>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
