import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import axios from "axios";
import { Rating } from "@material-ui/lab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory, useLocation } from "react-router-dom";

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

import "./ProductDetail.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 2),
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

export default function AdminProductDetail({ match, location }) {
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);
  const [product, setProduct] = useState(location.state.product);
  const [categories, setCategories] = useState(location.state.categories);
  const productId = match.params.id;
  const [currentCat, setCurrentCat] = useState([]);
  // const [click, setClick] = useState(0);
  const [open, setOpen] = useState(false);

  let history = useHistory();

  const handleClose = () => {
    setCurrentCat([]);
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const handleSaveEdit = () => {
    try {
      axios
        .put(`http://localhost:5000/admin/products/${productId}`, {
          name: product.name,
          cost: product.cost,
          author: product.author,
          publishedYear: product.publishedYear,
          picture: product.picture,
          category: currentCat,
          quantity: product.quantity,
          onDiscount: product.onDiscount,
          numOfReviews: product.numOfReviews,
          ratePoint: product.ratePoint,
        })
        .then(async (res) => {
          alert(res.data.msg);
        })
        .catch((err) => {
          setErrors(true);
        });
      setOpen(false);
    } catch {}
  };

  const handleDelete = () => {
    try {
      axios
        .delete(`http://localhost:5000/admin/products/${productId}`)
        .then(async (res) => {
          alert(res.data.msg);
          history.push("/admin/products");
        })
        .catch((err) => {
          setErrors(true);
        });
      setOpen(false);
    } catch {}
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

  return (
    <div>
      {hasErrors && (
        <Paper className={classes.paper}>
          <Typography component="p">
            An error has occurred, please try reloading the page.
          </Typography>
        </Paper>
      )}
      {!hasErrors && (
        <Row className="w-100 content">
          <Col md={4}>
            <Image
              className="w-50"
              src={product.picture}
              alt={product.name}
              fluid
            />
          </Col>
          <Col md={8}>
            <ListGroup className="text-capitalize">
              <ListGroup.Item align="center" style={{ fontSize: "xx-large" }}>
                {product.name}
              </ListGroup.Item>
              <ListGroup.Item variant="transparent">
                <Row>
                  <Col className="text-lg font-weight-bold">Author</Col>
                  <Col className="text-center">{product.author}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item variant="transparent">
                <Row>
                  <Col className="text-lg font-weight-bold">Cost</Col>
                  <Col className="text-center">{product.cost}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="text-lg font-weight-bold">Published Year</Col>
                  <Col className="text-center">{product.publishedYear}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="text-lg font-weight-bold">Quantity</Col>
                  <Col className="text-center">{product.quantity}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="text-lg font-weight-bold">Discount</Col>
                  <Col className="text-center">
                    {product.onDiscount ? <CheckIcon /> : <ClearIcon />}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="text-lg font-weight-bold">
                    Number of Reviews
                  </Col>
                  <Col className="text-center">{product.numOfReviews}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="text-lg font-weight-bold">Rating Point</Col>
                  <Col className="text-center">{product.ratePoint}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="text-lg font-weight-bold">Category</Col>
                  <Col className="text-center">
                    {product.category
                      ? product.category.map((item, index) => (
                          <Col key={index}>{item}</Col>
                        ))
                      : null}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <Row align="center" style={{ paddingTop: "1.75%" }}>
              <Col md={1} align="left" style={{ width: "50%" }}>
                <ThemeProvider theme={mainTheme}>
                  <Button
                    className="py-2 w-100"
                    color="secondary"
                    variant="contained"
                    size="large"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </ThemeProvider>
              </Col>
              <Col md={1} align="right" style={{ width: "50%" }}>
                <ThemeProvider theme={mainTheme}>
                  <Button
                    className="py-2 w-100"
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={openDialog}
                  >
                    EDIT
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
                        placeholder={product.name}
                        onChange={(val) => {
                          setProduct({
                            ...product,
                            name: val.target.value,
                          });
                        }}
                      />
                      <TextField
                        fullWidth
                        name="author-name"
                        label="Author of Book"
                        placeholder={product.author}
                        onChange={(val) => {
                          setProduct({
                            ...product,
                            author: val.target.value,
                          });
                        }}
                      />
                      <TextField
                        fullWidth
                        name="book-cost"
                        label="Cost of Book"
                        placeholder={product.cost}
                        onChange={(val) => {
                          setProduct({
                            ...product,
                            cost: val.target.value,
                          });
                        }}
                      />
                      <TextField
                        fullWidth
                        name="published-year"
                        label="Published Year of Book"
                        placeholder={product.publishedYear}
                        onChange={(val) => {
                          setProduct({
                            ...product,
                            publishedYear: val.target.value,
                          });
                        }}
                        style={{ marginBottom: "10px" }}
                      />
                      <TextField
                        fullWidth
                        name="picture-book"
                        label="Picture of Book"
                        placeholder={product.picture}
                        onChange={(val) => {
                          setProduct({
                            ...product,
                            picture: val.target.value,
                          });
                        }}
                      />
                      <TextField
                        fullWidth
                        name="quantity"
                        label="Quantity of Book"
                        placeholder={product.quantity}
                        onChange={(val) => {
                          setProduct({
                            ...product,
                            quantity: val.target.value,
                          });
                        }}
                      />
                      <TextField
                        fullWidth
                        name="book-discount"
                        label="Discount of Book"
                        placeholder={product.onDiscount}
                        onChange={(val) => {
                          setProduct({
                            ...product,
                            onDiscount: val.target.value,
                          });
                        }}
                      />
                      <TextField
                        fullWidth
                        name="num-review"
                        label="Reviews of Book"
                        placeholder={product.numOfReviews}
                        onChange={(val) => {
                          setProduct({
                            ...product,
                            numOfReviews: val.target.value,
                          });
                        }}
                      />
                      <TextField
                        fullWidth
                        name="rate-point"
                        label="Rating of Book"
                        placeholder={product.ratePoint}
                        onChange={(val) => {
                          setProduct({
                            ...product,
                            ratePoint: val.target.value,
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
                          onClick={handleSaveEdit}
                        >
                          Finalize
                        </Button>
                      </ThemeProvider>
                    </form>
                  </Dialog>
                </ThemeProvider>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}
