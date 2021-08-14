import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  Button,
} from "@material-ui/core";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Header from "../../pages/Header";
import { useHistory, useLocation } from "react-router-dom";
import "../BookingConfirmation/BookingConfirmation.scss"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3, 2),
  }
}));

export default function BookingConfirmation() {
  const classes = useStyles();
  let location = useLocation();
  const productsInOrder = location.state || [];
  const [hasErrors, setErrors] = useState(false);
  const [products, setProducts] = useState(productsInOrder);
  const [total, setTotal] = useState(0);

  let history = useHistory();

  async function fetchTotal() {
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
    fetchTotal();
  }, [total]);

  const handleReturn = () => {
    history.push("/products", products);
  };

  const handlePurchase = () => {
    history.push("/order/checkout", products);
  };

  const handleDelete = (product) => {
    const result = products.filter(
      (productItemt) => productItemt.id != product.id
    );
    setProducts(result);
    fetchTotal();
  };

  const handleSub = (product) => {
    const result = products.copyWithin(0, 0);
    const findIndex = products.findIndex(productItemt => productItemt.id == product.id);
    result[findIndex].quantity = result[findIndex].quantity - 1;
    if (result[findIndex] === 0) {
      handleDelete(product);
    } else {
      setProducts(result);
      fetchTotal();
    }
  };

  const handleAdd = (product) => {
    const result = products.copyWithin(0, 0);
    const findIndex = products.findIndex(
      (productItemt) => productItemt.id == product.id
    );
    result[findIndex].quantity = result[findIndex].quantity + 1;
    setProducts(result);
    fetchTotal();
  };

  return (
    <div className={classes.root}>
      <Header />
      {hasErrors && (
        <Paper className={classes.paper}>
          <Typography component="p">
            An error has occurred, please try reloading the page.
          </Typography>
        </Paper>
      )}
      {!hasErrors && (
        <Grid container className="content">
          <Grid xs={10} style={{ paddingLeft: "20%" }}>
            <div>
              {products.map((product) => {
                if (product.quantity === 0) {
                  return null;
                } else {
                  return (
                    <ListGroup>
                      <ListGroup.Item>
                        <Row >
                          <Col className="text-center">
                            <Image
                              src={product.picture}
                              width="80px"
                              height="145px"
                            />
                          </Col>
                          <Col xs={10}>
                            <Row>
                              <Row>
                                <Typography className="text-capitalize" noWrap variant="h4">
                                  {product.name}
                                </Typography>
                              </Row>
                              <Row>
                                <Typography noWrap variant="h6" >
                                  x{product.quantity}
                                </Typography>
                              </Row>
                            </Row>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col
                            className="d-flex"
                          >
                            <Button
                              className="ml-auto"
                              variant="outlined"
                              color="primary"
                              type="submit"
                              onClick={() => { handleSub(product) }}
                            >
                              <RemoveIcon />
                            </Button>
                            <Button
                              style={{ marginLeft: "20px" }}
                              variant="outlined"
                              color="primary"
                              type="submit"
                              onClick={() => { handleAdd(product) }}
                            >
                              <AddIcon />
                            </Button>
                            <Button
                              style={{ marginLeft: "20px" }}
                              variant="contained"
                              color="secondary"
                              type="submit"
                              onClick={() => { handleDelete(product) }}
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
