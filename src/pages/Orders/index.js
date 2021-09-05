import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Header from "../Header";
import axios from "axios";
import "../Orders/Orders.scss";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: theme.spacing(3, 2),
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    cursor: "pointer",
  },
}));

export default function Orders({ location }) {
  const classes = useStyles();

  const [hasErrors, setErrors] = useState(false);
  const [orders, setOrders] = useState([]);

  const productsOrder = location.state || [];

  let history = useHistory();

  async function fetchOrders() {
    try {
      const userID = localStorage.getItem("userID");
      axios
        .post(
          "https://ecommerce-backend-0001.herokuapp.com/user/orders",
          { userID: userID },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          const orders = res.data.orders;
          setOrders(orders);
        })
        .catch((err) => {
          setErrors(true);
        });
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={classes.root}>
      <Header dataProductsOrder={productsOrder} />
      {hasErrors && (
        <Paper className={classes.paper}>
          <Typography component="p">
            An error has occurred, please try reloading the page.
          </Typography>
        </Paper>
      )}
      {!hasErrors && (
        <div className="content">
          <Paper className={classes.paper}>
            <Typography variant="h5">Orders</Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total Items</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    hover
                    className={classes.tableRow}
                    key={order._id}
                    onClick={() => {
                      history.push(`/orders/${order._id}`, order);
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {order._id}
                    </TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>
                      {(order.cart && order.cart.length) || 0}
                    </TableCell>
                    <TableCell>{order.total} VND</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )}
    </div>
  );
}
