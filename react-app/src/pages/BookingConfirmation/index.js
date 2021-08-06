import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, TextField, Box, ThemeProvider, Tabs, Tab, Divider, TextareaAutosize, Avatar } from "@material-ui/core";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { createTheme } from '@material-ui/core/styles';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Rating, TabPanel } from '@material-ui/lab';

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
  textField: {
    [`& fieldset`]: {
      borderRadius: '6px',
    },
  },
  form: {

  },
}));

const CustomButton = withStyles((theme) => ({
  root: {
    borderRadius: '20px',
    border: '1px black solid',
    fontSize: 25,
    fontWeight: 'bold',
    padding: '10px 30px',

    color: theme.palette.getContrastText("#FFEB3B"),
    backgroundColor: "#FFEB3B",
    '&:hover': {
      backgroundColor: "#FFA700"
    },
  },
}))(Button);

export default function BookingConfirmation({ location }) {
  const classes = useStyles();
  const [hasErrors, setErrors] = useState(false);
  const [product, setProduct] = useState({});
  //let location = useLocation();
  const productId = location.state

  console.log(location)
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
            <Grid container >
              <Grid item container md={6} direction="column" justifyContent="center" alignItems="center" style={{backgroundColor: '#fdfdd3'}}
               className={classes.form} >
                <Grid item style={{marginBottom: '5%'}}>
                  <Typography style={{marginTop: '15%'}} align='center' variant='h4'>Please confirm your information</Typography>  
                </Grid>
                <Grid item style={{margin: '10%'}}>
                  <form>
                    <TextField 
                      style={{marginBottom: '10px'}} 
                      className={classes.textField} 
                      variant="outlined" 
                      fullWidth 
                      label='Full name' 
                      placeholder="Receiver's name"
                    />
                    <TextField 
                      style={{marginBottom: '10px', width: '60%', marginRight: '1%'}} 
                      className={classes.textField} 
                      variant="outlined" 
                      label='Email adress' 
                      placeholder="Receiver's email"
                    />
                    <TextField 
                      style={{marginBottom: '10px', width: '39%'}}
                      className={classes.textField}  
                      variant="outlined"
                      label='Phone number' 
                      placeholder='Phone number'
                    />
                    <TextField 
                      style={{marginBottom: '10px'}}
                      variant="outlined" 
                      className={classes.textField} 
                      fullWidth 
                      label='Address' 
                      placeholder='Home Address'
                    />
                    <TextField
                      style={{marginRight: '1%', width: '33%'}}
                      variant="outlined"
                      className={classes.textField}
                      label="City"
                      select
                    />
                    <TextField
                      style={{marginRight: '1%', width: '32.5%'}}
                      variant="outlined"
                      className={classes.textField}
                      label="District"
                      select
                    />
                    <TextField
                      style={{width: '32.5%' }}                    
                      variant="outlined"
                      className={classes.textField}
                      label="Ward"
                      select
                    />
                    <Box style={{marginTop: '20px', textAlign: 'center'}}>
                      <CustomButton 
                        type='submit' 
                        variant="contained" 
                      >
                        Confirm
                      </CustomButton>
                    </Box>
                  </form>
                </Grid>
              </Grid>
              <Grid xs={6} style={{paddingLeft: '0%'}}>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col><Image src={`../../${product.picture}/preview.jpg`} width='80px' height='145px'/></Col> 
                      <Col style={{alignSelf: 'center'}} align='center'><Typography noWrap variant="h4" display='inline'>{product.name}</Typography></Col>
                      <Col style={{alignSelf: 'center'}} align='right'>x1</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col xs={10} align='right' style={{alignSelf: 'center', marginTop: '0.5%'}}><TextField placeholder='Coupon' variant='outlined'/></Col>
                      <Col xs={2} style={{alignSelf:'center'}}><Button style={{paddingLeft: '20%', paddingRight: '20%'}} variant='outlined' type='submit'>Apply</Button></Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item style={{fontWeight: 'bold'}}>
                    <Row>
                      <Col>Temporary</Col>
                      <Col align='right'>{product.cost}</Col>
                      <Col align='right'>VND</Col>
                    </Row>
                    <Row>
                      <Col>Shipping Fee</Col>
                      <Col align='right'>---</Col>
                      <Col align='right'>VND</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row style={{fontWeight: 'bold'}}>
                      <Col>SUM AMOUNT</Col>
                      <Col align='right'>{product.cost} + ---</Col>
                      <Col align='right'>VND</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Grid>
            </Grid>
  )
}
          </div >);
  }