import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import axios from "axios";
import { Rating } from "@material-ui/lab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory, useLocation } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { Button, Chip, ThemeProvider, IconButton, TextField, Dialog, InputAdornment } from "@material-ui/core";

import "../ProductDetail/ProductDetail.scss";
import CardShoppingIcon from "../CardShoppingIcon";
import Header from "../Header";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 2),
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

export default function ProductDetail({ match, location }) {
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);
  const [product, setProduct] = useState(location.state.product);
  const productId = match.params.id;
  let productsOrder = location.state.productsOrder || [];
  const [products, setProducts] = useState(productsOrder);
  const [click, setClick] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let history = useHistory();

  // async function fetchProduct(productId) {
  //   // axios
  //   //   .get("http://localhost:5000/api/products")
  //   //   .then((res) => {
  //   //     const products = res.data.products;
  //   //     const product = products.find((product) => product.id === productId);
  //   //     setProduct(product);
  //   //   })
  //   //   .catch((err) => {
  //   //     setErrors(true);
  //   //   });
  //   console.log(location.state);
  //   console.log(location.state.product);
  //   console.log(location.state.order);
  // }

  // useEffect(() => {
  //   fetchProduct(productId);
  // }, []);

  function handleAddWishlist() {
    let temp = {
      id: product.id,
      name: product.name,
      picture: product.picture,
      cost: product.cost,
      quantity: 1,
    };
    const found = productsOrder.findIndex(
      (productItemt) => productItemt.id == product.id
    );
    if (found == -1) {
      productsOrder.push(temp);
    } else {
      productsOrder[found].quantity++;
    }
    setProducts(productsOrder);
    setClick(click + 1);
  }

  const handleBack = () => {
    history.push("/products", productsOrder);
  };

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
        <Row className="w-100 content">
          <Col md={4}>
            <Image
              className="w-100"
              src={product.picture}
              alt={product.name}
              fluid
            />
          </Col>
          <Col md={8}>
            <ListGroup className="text-capitalize">
              <ListGroup.Item align="center" style={{ fontSize: "xx-large" }}>
                <Row>
                  <Col align='right' md={7}>
                    {product.name}
                  </Col>
                  <Col md={5} align='right'>
                    <IconButton 
                      size="small"
                      onClick={handleClickOpen}
                    >
                        <EditIcon/>
                      </IconButton>
                      <Dialog open={open} onClose={handleClose}>
                        <form style={{ padding: "20px 60px 20px 60px" }}>
                          <TextField
                            fullWidth
                            name="title"
                            label="Title"
                            placeholder={product.name}
                          />
                          <TextField
                            fullWidth
                            name="author-name"
                            label="Author's name"
                            placeholder={product.author}
                          />
                          <TextField
                            fullWidth
                            name="published-year"
                            label="Year of Publication"
                            placeholder={product.publishedYear}
                            style={{marginBottom: '10px'}}
                          />
                            {product.category
                              ? product.category.map((item, index) => (
                                
                                  <Chip
                                    label={item}
                                    onDelete={
                                      product.category.filter((it, ind) => ind !== index)
                                    }
                                  />
                                
                              ))
                            : null}
                          <TextField
                            style={{width: '30%', marginLeft: '5px'}}
                            name="new-tag"
                            InputProps={{
                              endAdornment: <InputAdornment position="end"><IconButton><AddIcon/></IconButton></InputAdornment>,
                            }}
                          />
                          <ThemeProvider theme={mainTheme}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              fullWidth
                              style={{marginTop: '10px'}}
                            >
                              Finalize
                            </Button>
                          </ThemeProvider>
                        </form>
                      </Dialog>
                  </Col>
                </Row>
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
              <ListGroup.Item>
                <Row>
                  <Col className="text-lg font-weight-bold">Rating</Col>
                  <Col className="text-center">
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
                  <Col className="text-lg font-weight-bold">Status</Col>
                  <Col className="text-center">
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
                <Col md={1} align="left" style={{ width: "75%" }}>
                  {product.quantity > 0 ? (
                    <ThemeProvider theme={mainTheme}>
                      <Button
                        className="py-2 w-100"
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
                        className="py-2 w-100"
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
                <Col md={1} align="right" style={{ width: "25%" }}>
                  <ThemeProvider theme={mainTheme}>
                    <Button
                      className="py-2 w-100"
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
      {/* {console.log("render", products)} */}
      <CardShoppingIcon dataProductsOrder={products} />
    </div>
  );
}
