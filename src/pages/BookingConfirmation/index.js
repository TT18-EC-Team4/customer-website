import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  Button,
  TextField,
  // Box,
  // ThemeProvider,
  // Tabs,
  // Tab,
  // Divider,
  // TextareaAutosize,
  // Avatar,
} from "@material-ui/core";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
// import CheckIcon from "@material-ui/icons/Check";
// import ClearIcon from "@material-ui/icons/Clear";
// import { createTheme } from "@material-ui/core/styles";
// import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
// import { Rating, TabPanel } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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
  textField: {
    [`& fieldset`]: {
      borderRadius: "6px",
    },
  },
  form: {},
  button: {
    margin: theme.spacing(1),
  },
}));

let wlist = new Map();

export default function BookingConfirmation({ history, location }) {
  const classes = useStyles();
  const productsInOrder = location.state;
  const [hasErrors, setErrors] = useState(false);
  const [products, setProducts] = useState(productsInOrder);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  async function fetchProduct() {
    try {
      let temp = 0;
      for (var i = 0; i < products.length; i++) {
        temp += products[i].cost * products[i].quantity;
      }
      setTotal(temp);
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchProduct();
    console.log("render 1");
    console.log(products);
    // eslint-disable-next-line
  }, [total]);

  const handleReturn = () => {
    history.push("/products", products);
  };

  const handlePurchase = () => {
    history.push("/order/checkout", products);
  };

  const handleDelete = (product) => {
    const result = products.filter(productItemt => productItemt.id != product.id);
    product.quantity = 0;
    setProducts(result);
    fetchProduct();
  }

  const handleSub = (product) => {
    const result = products.copyWithin(0, 0);
    const findIndex = products.findIndex(productItemt => productItemt.id == product.id);
    result[findIndex].quantity = result[findIndex].quantity-1;
    console.log(result);
    if (result[findIndex] == 0) {
      handleDelete(product);
    }
    else {
      setProducts(result);
      fetchProduct();
    }
  }

  const handleAdd = (product) => {
    const result = products.copyWithin(0, 0);
    const findIndex = products.findIndex(productItemt => productItemt.id == product.id);
    result[findIndex].quantity = result[findIndex].quantity + 1;
    console.log(result);
    setProducts(result);
    fetchProduct();
  }

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
        <Grid container>
          <Grid xs={10} style={{ paddingLeft: "20%" }}>
            <div>
              {products.map((product) => {
                if (product.quantity === 0) {
                  return null;
                } else {
                  return (
                    <ListGroup>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <Image
                              src={`../../${product.picture}/preview.jpg`}
                              width="80px"
                              height="145px"
                            />
                          </Col>
                          <Col style={{ alignSelf: "center" }} align="center">
                            <Typography noWrap variant="h4" display="inline">
                              {product.name}
                            </Typography>
                          </Col>
                          <Col style={{ alignSelf: "center" }} align="right">
                            x{product.quantity}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col
                            xs={4}
                            style={{
                              alignSelf: "right",
                              marginLeft: "auto",
                              display: "flex",
                            }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              type="submit"
                              onClick={() => {handleSub(product)}}
                            >
                              <RemoveIcon />
                            </Button>
                            <Button
                              style={{ marginLeft: "20px" }}
                              variant="outlined"
                              color="primary"
                              type="submit"
                              onClick={() => {handleAdd(product)}}
                            >
                              <AddIcon />
                            </Button>
                            <Button
                              style={{ marginLeft: "20px" }}
                              variant="contained"
                              color="secondary"
                              type="submit"
                              onClick={() => {handleDelete(product)}}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontWeight: "bold" }}>
                        <Row>
                          <Col>Temporary</Col>
                          <Col align="right">
                            {product.cost * product.quantity}
                          </Col>
                          <Col align="right">VND</Col>
                        </Row>
                        <Row>
                          <Col>Shipping Fee</Col>
                          <Col align="right">---</Col>
                          <Col align="right">VND</Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  );
                }
              })}
            </div>
            <ListGroup>
              <ListGroup.Item>
                <Row style={{ fontWeight: "bold" }}>
                  <Col>SUM AMOUNT</Col>
                  <Col align="right">{total}</Col>
                  <Col align="right">VND</Col>
                </Row>
                <Row style={{ fontWeight: "bold" }}>
                  <Col>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={handleReturn}
                    >
                      Continue Shopping
                    </Button>
                  </Col>
                  <Col align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handlePurchase}
                    >
                      Checkout
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
