import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import axios from "axios";

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
}));

export default function Orders({ match, location }) {
  const classes = useStyles();

  const [hasErrors, setErrors] = useState(false);
  const [order, setOrder] = useState(location.state);

  const orderId = match.params.id;

  const handleCancel = () => {
    axios
      .put(`https://ecommerce-backend-0001.herokuapp.com/user/orders/${orderId}`)
      .then((res) => {
        const { msg, newStatus } = res.data;
        setOrder({ ...order, status: newStatus });
        alert(msg);
      })
      .catch((err) => {
        setErrors(true);
      });
  };

  useEffect(() => {
    console.log(order);
  }, [order]);

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
        <Paper className={classes.paper}>
          <Grid
            className={classes.grid}
            container
            spacing={3}
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item xs={12}>
              <Typography variant="h5">{order.id}</Typography>
            </Grid>
            <Grid item md={5} xs={12}>
              <Typography component="p">
                <b>Date: </b>
                {order.orderDate}
              </Typography>
              <Typography component="p">
                <b>Cost: </b>
                {order.total} VND
              </Typography>
              <Typography component="p">
                <b>Status: </b>
                {order.status}
              </Typography>
            </Grid>
            <Grid item md={5} xs={12}>
              <Typography component="p">
                <b>Order Items: </b>
              </Typography>
              {order.cart &&
                order.cart.map((item) => (
                  <Typography key={item}>{item}</Typography>
                ))}
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography component="p">
                <b>Cancel order: </b>
              </Typography>
              <Button
                disabled={
                  order.status === "Completed" || order.status === "Cancel"
                }
                onClick={handleCancel}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}
