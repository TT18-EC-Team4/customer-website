import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const Cities = [
  {
    value: 0,
    label: "Hồ Chí Minh",
  },
  {
    value: 1,
    label: "Cần Thơ",
  },
];

const Districts = [
  [
    {
      value: 0,
      label: "Quận 1",
    },
    {
      value: 1,
      label: "Quận 2",
    },
    {
      value: 2,
      label: "Quận 3",
    },
  ],
  [
    {
      value: 0,
      label: "Quận Ninh Kiều",
    },
    {
      value: 1,
      label: "Quận Bình Thủy",
    },
    {
      value: 2,
      label: "Quận Cái Răng",
    },
  ],
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({ products, info }) {
  const classes = useStyles();

  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState();

  async function fetchProduct() {
    try {
      // console.log(products);
      let temp = 0;
      for (var i = 0; i < products.length; i++) {
        temp += products[i].cost * products[i].quantity;
      }
      setTotal(temp);
    } catch (err) {
      setErrors(true);
    }
  }

  useEffect(() => {
    fetchProduct();
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Chi tiết đơn hàng
      </Typography>
      <List disablePadding>
        {products.length === 0 ? (
          <div>Please buy something</div>
        ) : (
          <div>
            {products.map((product) => (
              <ListItem className={classes.listItem} key={product.id}>
                <ListItemText
                  primary={product.name}
                  secondary={product.author}
                />
                <Typography variant="body2">
                  {product.cost} x {product.quantity}
                </Typography>
              </ListItem>
            ))}
            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                {total} VND
              </Typography>
            </ListItem>
          </div>
        )}
      </List>
      <Grid container spacing={2}>
        <Grid item xs={2} sm={10}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>Name: {info.name}</Typography>
          <Typography gutterBottom>
            Address: {info.address}, {Districts[info.city][info.district].label}
            , {Cities[info.city].label}
          </Typography>
          <Typography gutterBottom>Phone: {info.phone}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
