import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  Button,
  TextField,
  Box,
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


export default function BookingConfirmation({ history, location }) {
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const productsInOrder = location.state;

  async function fetchProduct() {
    try {
      // console.log(location.state);
      setProducts(Array.from(productsInOrder.keys()));
      setQuantities(Array.from(productsInOrder.values()));
      let temp = 0;
      for (var i = 0; i < products.length; i++) {
        temp += products[i].cost * quantities[i];
      }
      setTotal(temp);
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchProduct();
  });

  const handleReturn = () => {
    history.push({pathname:`/products`});
  }

  const handlePurchase = () => {
    history.push("/order/checkout", products);
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
                const qty = productsInOrder.get(product);
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
                        <Col style={{alignSelf: 'center'}} align='right'>
                          x{qty}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col
                          xs={10}
                          align="right"
                          style={{ alignSelf: "center", marginTop: "0.5%" }}
                        >
                          <TextField placeholder="Coupon" variant="outlined" />
                        </Col>
                        <Col xs={2} style={{ alignSelf: "center" }}>
                          <Button
                            style={{ paddingLeft: "20%", paddingRight: "20%" }}
                            variant="outlined"
                            type="submit"
                          >
                            Apply
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontWeight: "bold" }}>
                      <Row>
                        <Col>Temporary</Col>
                        <Col align="right">{product.cost * qty}</Col>
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
