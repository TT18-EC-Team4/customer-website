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
import Button from '@material-ui/core/Button';
import AddIcon from "@material-ui/icons/Add";
import { TextField, Dialog, ThemeProvider } from '@material-ui/core';


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

export default function AdminCategories() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [hasErrors, setErrors] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

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

  async function fetchData() {
    try {
        const categories = require("../../data/categories.json").categories;
        setCategories(categories);
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
        <Paper style={{width: '100%'}} elevation={0}>
          <Paper style={{textAlign: 'right', marginBottom: '0.75%'}} elevation={0}>
            <Button
              variant='contained'
              color='primary'
              startIcon={<AddIcon/>}
              onClick={openDialog}
            >
              Add new category
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
                  name="new-category"
                  label="New Category"
                />
                <ThemeProvider theme={mainTheme}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "10px" }}
                  >
                    Add new
                  </Button>
                </ThemeProvider>
              </form>
            </Dialog>
          </Paper>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{width: "20px"}}>#ID</TableCell>
              <TableCell >Tên thể loại</TableCell>
              <TableCell style={{width: "50px"}}></TableCell>
              <TableCell style={{width: "50px"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={categories.indexOf(category)}>
                <TableCell align="right">{categories.indexOf(category)}</TableCell>
                <TableCell align="left">{category}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="secondary">
                    Delete
                  </Button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
}