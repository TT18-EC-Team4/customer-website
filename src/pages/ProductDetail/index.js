import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import {
  Button,
  Chip,
  ThemeProvider,
  Tabs,
  Tab,
  Divider,
  TextareaAutosize,
  Avatar,
} from "@material-ui/core";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { createTheme } from "@material-ui/core/styles";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Rating, TabPanel } from "@material-ui/lab";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

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
  neededInfo: {
    fontSize: "large",
    fontWeight: "bold",
  },
  bodyBtnOrder: {
    position: "fixed",
    right: 0,
    bottom: 0,
    marginRight: '30px',
    marginBottom: '30px',
    boxShadow: '0 0 5px rgba(0, 0, 0.3)',
    height: '66px',
    width: '66px',
    borderRadius: '33px',
  },
  btnOrder: {
    height: '66px',
    width: '66px',
    borderRadius: '33px',
    fontWeight: 'bold',
    fontSize: '20px',
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

let productsOrder = [];

export default function Products({ match, history, location}) {
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);
  const [product, setProduct] = useState({});
  const [click, setClick] = useState(0);
  const productId = match.params.id;
  const [totalQuality, setTotalQuality] = useState(0);

  async function fetchTotalQuality() {
    try {
      let temp = 0;
      for (var i = 0; i < productsOrder.length; i++) {
        temp += productsOrder[i].quantity;
      }
      setTotalQuality(temp);
    } catch (err) {
      setErrors(true);
    }
  }

  async function fetchProduct(productId) {
    try {
      // const response = await fetch(
      //   `${process.env.REACT_APP_ORDERS_URL}/${orderId}`
      // );
      // const order = await response.json();
      const products = require("../../data/products.json").products;
      const product = products.find((product) => product.id === productId);
      setProduct(product);
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchProduct(productId);
    if (location.state) {
      productsOrder = location.productsOrder;
    }
    fetchTotalQuality();
  }, [totalQuality]);

  function handleAddWishlist() {
    let temp = {
      id: product.id,
      name: product.name,
      picture: product.picture,
      cost: product.cost,
      quantity: 1,
    };
    const found = productsOrder.findIndex(productItemt => productItemt.id == product.id);
    if (found == -1) {
      productsOrder.push(temp);
    } else {
      productsOrder[found].quantity++;
    }
    fetchTotalQuality();
  }

  const handleBack = () => {
    history.push("/products", productsOrder);
  }
  const handleSeeOrder = () => {
    history.push("/order/confirmation", productsOrder);
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
        <Row>
          <Col md={4}>
            <Image
              src={`../../${product.picture}/main.jpg`}
              alt={product.name}
              fluid
            />
          </Col>
          <Col md={8}>
            <ListGroup className={classes.restyle}>
              <ListGroup.Item
                className={classes.restyle}
                align="center"
                style={{ fontSize: "xx-large" }}
              >
                {product.name}
              </ListGroup.Item>
              <ListGroup.Item variant="transparent">
                <Row>
                  <Col className={classes.neededInfo}>Author</Col>
                  <Col style={{ alignSelf: "center" }}>{product.author}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className={classes.neededInfo}>Published Year</Col>
                  <Col style={{ alignSelf: "center" }}>
                    {product.publishedYear}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className={classes.neededInfo}>Category</Col>
                  <Col style={{ alignSelf: "center" }}>
                    {product.category
                      ? product.category.map((item, index) => (
                          <Col key={index}>{item}</Col>
                        ))
                      : null}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className={classes.neededInfo}>Rating</Col>
                  <Col style={{ alignSelf: "center" }}>
                    <Rating
                      name="rate"
                      value={
                        product.numOfReviews > 0
                          ? product.ratePoint / product.numOfReviews
                          : 0
                      }
                      precision={0.5}
                      max={5}
                      readOnly
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className={classes.neededInfo}>Status</Col>
                  <Col style={{ alignSelf: "center" }}>
                    {product.quantity > 0 ? (
                      <ThemeProvider theme={mainTheme}>
                        <Chip
                          label="AVAILABLE"
                          color="primary"
                          icon={<CheckIcon />}
                        />
                      </ThemeProvider>
                    ) : (
                      <ThemeProvider theme={mainTheme}>
                        <Chip
                          label="UNAVAILABLE"
                          color="secondary"
                          icon={<ClearIcon />}
                        />
                      </ThemeProvider>
                    )}
                    {product.onDiscount !== 0 ? (
                      <ThemeProvider theme={mainTheme}>
                        <Chip
                          color="secondary"
                          label="DISCOUNT"
                          icon={<MonetizationOnIcon />}
                        />
                      </ThemeProvider>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <Row align="center" style={{ paddingTop: "1.75%" }}>
                <Col md={1} align="left" style={{ width: "75%"}}>
                  {product.quantity > 0 ? (
                    <ThemeProvider theme={mainTheme}>
                      <Button
                        style={{ padding: "20px 10px", width: "100%" }}
                        startIcon={<ShoppingCartIcon />}
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={handleAddWishlist}
                      >
                        ADD TO WISHLIST
                      </Button>
                    </ThemeProvider>
                  ) : (
                    <ThemeProvider theme={mainTheme}>
                      <Button
                        style={{ padding: "20px 10px", width: "100%"}}
                        startIcon={<ShoppingCartIcon />}
                        variant="contained"
                        size="large"
                        disabled
                      >
                        OUT OF STOCK
                      </Button>
                    </ThemeProvider>
                  )}
                </Col>
                <Col md={1} align="right" style={{ width: "25%"}}>
                  <ThemeProvider theme={mainTheme}>
                      <Button
                        style={{ padding: "20px 10px", width: "100%" }}
                        endIcon={<ChevronRightIcon />}
                        color="secondary"
                        variant="contained"
                        size="large"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                  </ThemeProvider>
                </Col>
                {/* <Col md={1} style={{width: '30%'}}>
                  <ThemeProvider theme={mainTheme}>
                    <Button
                      style={{padding: '4%', width: '100%', height: '100%'}}
                      startIcon={<AssignmentTurnedInIcon/>}
                      color="primary"
                      variant="contained"
                      size="large">
                        ADD TO CART
                    </Button>
                  </ThemeProvider>
                </Col> */}
              </Row>
              {/* <Row style={{paddingTop: '2%'}}>
                <Col md={1} style={{width: "60%"}}>
                  <Paper>
                    <Tabs variant="fullWidth">
                      <Tab label="About the book"/>
                      <Tab label="About the author"/>
                    </Tabs>
                  </Paper>
                </Col>
                <Col md={1} style={{alignSelf: 'center', paddingLeft: '1.5%', width: '40%'}}>
                  <Row>
                    <Col><Typography display="inline" style={{fontWeight: 'bold'}} gutterBottom variant="subtitle">Review Section</Typography></Col>
                    <Col><Typography align="right" display="block" style={{fontWeight: 'bold'}} gutterBottom variant='caption'>{product.numOfReviews} review(s)</Typography></Col>
                  </Row>
                  <Divider style={{marginBottom: '2.5%', backgroundColor: '#000080'}}/>
                  <Row>
                    <TextareaAutosize  minRows={4} maxRows={4} placeholder='Be polite!'/>
                  </Row>
                </Col>
              </Row> */}
            </ListGroup>
          </Col>
        </Row>
      )}
      <div className={classes.bodyBtnOrder}>
        {totalQuality  == 0 ? (
        <Button className={classes.btnOrder} variant="contained" color="secondary">
          <AddShoppingCartIcon />
        </Button>
        ) : (
        <Button onClick={handleSeeOrder} className={classes.btnOrder} variant="contained" color="secondary">
          {totalQuality}
        </Button>
        )}
      </div>
    </div>
  );
}
