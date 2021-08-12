import React, { useEffect, useState }  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ImageListItem from '@material-ui/core/ImageListItem';
import Button from '@material-ui/core/Button';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
}));

export default function AdminProducts() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [hasErrors, setErrors] = useState(false);

  async function fetchData() {
    try {
      const products = require("../../data/products.json").products;
      setProducts(products);
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
              <TableCell style={{width: "20px"}}>#ID</TableCell>
              <TableCell style={{width: "35px"}}>Hình</TableCell>
              <TableCell >Tên sản phẩm</TableCell>
              <TableCell style={{width: "50px"}}></TableCell>
              <TableCell style={{width: "50px"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="right">{product.id}</TableCell>
                <TableCell align="center">
                  <img src={`../../${product.picture}/main.jpg`} alt={product.name} style={{width: "100%"}} />
                </TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="secondary">
                    Xóa
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary">
                    Sửa
                  </Button>
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