import React, { useEffect, useState }  from 'react';
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ImageListItem from '@material-ui/core/ImageListItem';
import AddIcon from '@material-ui/icons/Add';
import { Button, Chip, ThemeProvider, IconButton, TextField, Dialog, InputAdornment } from "@material-ui/core";

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

export default function AdminProducts() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [hasErrors, setErrors] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                  <img src={`../../${product.picture}/preview.jpg`} alt={product.name} style={{width: "100%"}} />
                </TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="secondary">
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Edit
                  </Button>
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
                            product.category.filter((it, ind) => ind !== index)}
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