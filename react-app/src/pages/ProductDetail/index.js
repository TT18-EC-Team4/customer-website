import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box, Button, CardHeader, Chip, ThemeProvider } from "@material-ui/core";
import {Row, Col, Image, ListGroup, Form, ListGroupItem} from "react-bootstrap"; 
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { createTheme } from '@material-ui/core/styles';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    margin: "0 auto",
    width: "100%"
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  media: {
    backgroundSize: 'contain',
    margin: "2.5%",
    paddingTop: "56.25%" // 16:9
  },
  neededInfo: {
    fontSize: "large",
    fontWeight: "bold"
  },
}));

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
      light: "#e33c05"
    },
    secondary: {
      main: "#d32f2f"
    },
  }
})

export default function Products({ match }) {
  const classes = useStyles();
  
  const [hasErrors, setErrors] = useState(false);
  const [product, setProduct] = useState({});
  
  const productId = match.params.id;
    
  async function fetchProduct(productId) {
    try {
    // const response = await fetch(
    //   `${process.env.REACT_APP_ORDERS_URL}/${orderId}`
    // );
    // const order = await response.json();
      const products = require("../../data/products.json").products;
      const product = products.find(product => product.id === productId);     
      setProduct(product);
      
    } catch (err) {
      setErrors(true);
    }
  }
  
    useEffect(() => {
      fetchProduct(productId);
    }, [productId]);

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
            <Image src={`../../${product.picture}/main.jpg`} alt={product.name}  fluid />
          </Col>
          <Col md={8}>
            <ListGroup className={classes.restyle}>
              <ListGroup.Item className={classes.restyle} align="center" style={{fontSize: "xx-large"}}>
                {product.name}
              </ListGroup.Item>
              <ListGroup.Item variant="transparent">
                  <Row>
                    <Col className={classes.neededInfo}>Author</Col>
                    <Col>{product.author}</Col>
                  </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Row>
                    <Col className={classes.neededInfo}>Published Year</Col>
                    <Col>{product.publishedYear}</Col>
                  </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Row>
                    <Col className={classes.neededInfo}>Category</Col>
                    
                  </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Row>
                    <Col className={classes.neededInfo}>Description</Col>
                    <Col>{product.author}</Col>
                  </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Row>
                    <Col className={classes.neededInfo}>Status</Col>
                    <Col>{product.quantity > 0 ? 
                      (
                        <ThemeProvider theme={mainTheme}>
                          <Chip
                            label="AVAILABLE"
                            color="primary"
                            icon={<CheckIcon/>}
                          />
                        </ThemeProvider>
                      ) : (
                        <ThemeProvider theme={mainTheme}>
                          <Chip
                            style={{padding: '5%'}}
                            label="UNAVAILABLE"
                            color="secondary"
                            icon={<ClearIcon/>}
                          />
                        </ThemeProvider>
                      )}
                      {product.onDiscount !== 0 ?
                      (
                        <ThemeProvider theme={mainTheme}>
                          <Chip
                            color="secondary"
                            label="DISCOUNT"
                            icon={<MonetizationOnIcon/>}
                          />
                        </ThemeProvider>
                      ): ("")}
                      </Col>
                  </Row>
              </ListGroup.Item>
              <Row align="center" style={{paddingTop: '1.75%'}}>
                <Col md={1} align="right" style={{width: '70%'}}>
                  <ThemeProvider theme={mainTheme}>
                    <Button
                      style={{padding: '4%', width: '100%'}}
                      startIcon={<ShoppingCartIcon/>}
                      color="primary"
                      variant="contained"
                      size="large">
                        ADD TO WISHLIST
                    </Button>
                  </ThemeProvider>
                </Col>
                <Col md={1} style={{width: '30%'}}>
                  <ThemeProvider theme={mainTheme}>
                    <Button
                      style={{padding: '4%', width: '100%', height: '100%'}}
                      startIcon={<AssignmentTurnedInIcon/>}
                      color="primary"
                      variant="contained"
                      size="large">
                        BOOK
                    </Button>
                  </ThemeProvider>
                </Col>
              </Row>
              </ListGroup>
          </Col>
          </Row>
    )    
}
</div>);
}