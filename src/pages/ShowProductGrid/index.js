import React from "react";
import { useHistory } from "react-router-dom";
import "../ShowProductGrid/ShowProductGrid.scss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function ShowProductGrid(props) {
  const product = props.dataProduct;
  const productsOrder = props.dataProductsOrder;
  let history = useHistory();

  const handleProductDetail = (productId) => {
    console.log(product);
    console.log(productsOrder);
    history.push(`/products/${productId}`, {
      product: product,
      productsOrder: productsOrder,
    });
  };

  return (
    <Grid
      key={product.id}
      item
      className={window.location.pathname === "/" ? "col-4" : "col-5"}
    >
      <Card
        onClick={() => {
          handleProductDetail(product.id);
        }}
        className="cardContainer"
        variant="outlined"
        elevation={10}
        title={product.name}
      >
        <CardActionArea>
          <CardMedia
            className="card-media"
            image={product.picture}
            title={product.name}
          />
          <CardContent
            style={{
              borderTop: "1px solid #f3f3f3",
              backgroundColor: product.quantity > 0 ? "#fff" : "#f1f1f1",
            }}
          >
            <Typography
              variant="body1"
              className="h7 font-weight-bold text-capitalize"
              noWrap
            >
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              className="h8 text-muted text-left text-capitalize"
              noWrap
            >
              {product.author}
            </Typography>
            <div className="d-flex">
              <Typography
                variant="body1"
                className="h8 font-weight-bold text-left"
                color={product.quantity > 0 ? "primary" : "secondary"}
              >
                {product.quantity > 0 ? "AVAILABLE" : "UNAVAILABLE"}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                className="h8 text-right ml-auto"
                noWrap
              >
                {product.cost}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default ShowProductGrid;
