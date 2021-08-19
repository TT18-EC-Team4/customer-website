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
    margin: theme.spacing(3),
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
  // const [click, setClick] = useState(0);
  const [open, setOpen] = useState(false);

  let history = useHistory();

  const handleClose = () => {
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
          category: product.category,
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
              <ListGroup.Item>
                <Row>
                  <Col className="text-lg font-weight-bold">Published Year</Col>
                  <Col className="text-center">{product.publishedYear}</Col>
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
                      {/* <FormGroup>
                        {categories.map((item) => (
                          <FormControlLabel
                            control={<Checkbox name={item} />}
                            label={item}
                          />
                        ))}
                      </FormGroup> */}
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
