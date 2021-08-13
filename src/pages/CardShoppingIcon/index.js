import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useHistory } from 'react-router-dom';
import "../CardShoppingIcon/CardShoppingIcon.scss";

function CardShoppingIcon(props) {
  const productsOrder = props.dataProductsOrder || [];
  const [totalQuality, setTotalQuality] = useState(0);
  let history = useHistory();

  function fetchTotalQuality() {
    let temp = 0;
    for (var i = 0; i < productsOrder.length; i++) {
      temp += productsOrder[i].quantity;
    }
    setTotalQuality(temp);
  }

  useEffect(() => {
    fetchTotalQuality();
  }, []);

  const handleSeeOrder = () => {
    history.push("/order/confirmation", productsOrder);
  }

  return (
    <div className="body-btn-order">
      {totalQuality == 0 ? (
        <Button className="btn-order" variant="contained" color="secondary">
          <AddShoppingCartIcon />
        </Button>
      ) : (
        <Button onClick={handleSeeOrder} className="btn-order" variant="contained" color="secondary">
          {totalQuality}
        </Button>
      )}
    </div>
  );
}

export default CardShoppingIcon;