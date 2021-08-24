import React, { Fragment, useEffect } from "react";
import axios from "axios";

import Typography from "@material-ui/core/Typography";

export default function BookingCheckout({ info, product }) {
  useEffect(() => {
    console.log(info);
    console.log(product);

    const sendOrder = () => {
      try {
        const userId = localStorage.getItem("userID");
        let cart = [];
        product.map((item) => {
          cart.push(item.id);
        });
        let total = 0;
        for (var i = 0; i < product.length; i++) {
          total += product[i].cost * product[i].quantity;
        }
        let today = new Date();
        let date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        let time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        let dateTime = date + " " + time;
        const param = JSON.stringify({
          userId: userId,
          receiverName: info.name,
          receiverPhone: info.phone,
          receiverAddress: info.address,
          cart: cart,
          total: total,
          orderDate: dateTime,
          status: "Append",
        });
        console.log(param);
        axios
          .post("http://localhost:5000/user/orders/checkout", param, {
            headers: {
              "content-type": "application/json",
            },
          })
          .then((res) => {
            console.log(res.msg);
          });
      } catch {}
    };

    sendOrder();
  }, []);

  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>
        Thank you for your order.
      </Typography>
      <Typography variant="subtitle1">
        Your order number is #0000001. We have emailed your order confirmation,
        and will send you an update when your order has shipped.
      </Typography>
    </Fragment>
  );
}
