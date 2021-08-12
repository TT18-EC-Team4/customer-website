import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CardHeader, Button } from "@material-ui/core";
import DoneAllIcon from '@material-ui/icons/DoneAll';
// import { useHistory } from "react-router-dom";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { ListTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    margin: "0 auto",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(3, 2),
  },
  media: {
    backgroundSize: "contain",
    margin: "2.5%",
    paddingTop: "56.25%", // 16:9
  },
  titleStyle: {
    fontSize: "13.5px",
    fontWeight: "bold",
    alignContent: "center",
  },
  titleContainer: {
    backgroundColor: "yellow",
    padding: "2%",
    borderBottom: "1px solid black",
    textAlign: "center",
  },
  contentContainer: {
    textAlign: "center",
    borderTop: "1px solid black",
    alignItems: "center",
    fontWeight: "bold",
    "&:last-child": {
      padding: "2%",
    },
  },
  cardContainer: {
    borderRadius: "3px",
    border: "1px solid #f2f2f2",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  bodyBtnOrder: {
    position: "fixed",
    right: 0,
    bottom: 0,
    marginRight: '30px',
    marginBottom: '30px',
    boxShadow: '0 0 5px rgba(0, 0, 0.3)',
    height: '66px',
    width: '66px',
    borderRadius: '33px',
  },
  btnOrder: {
    height: '66px',
    width: '66px',
    borderRadius: '33px',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  contentCategory: {
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    paddingTop: "20px",
    paddingBottom: "20px"
  }
}));

let wlist = new Map();
let List = new Map();

export default function Home({ history, location }) {
  const classes = useStyles();
  const color = ["#03a9f4","#8bc34a","#ff9800", "#009688", "#3f51b5", "#f44336"];
  const [indexColor, setindexColor] = useState(0);
  const [seemore, setseemore] = useState("");
  const [hasErrors, setErrors] = useState(false);
  const [categories, setCategories] = useState([]);
  async function fetchData() {
    try {
      const products = require("../../data/products.json").products;
      const categories = require("../../data/categories.json").categories;
      setCategories(categories);
      for (let i in categories)
      {
        let productsCategory = [];
        for (let j in products) {
          const found = products[j].category.find(element => element == categories[i]);
          if (found != undefined)
          {
            productsCategory.push(products[j]);
          }
        }
        List.set(categories[i], productsCategory);
      }
    } catch (err) {
      setErrors(true);
    }
  }
  useEffect(() => {
    fetchData();
    if (location.state) {
      if (!wlist.has(location.state)) {
        wlist.set(location.state, 1);
      }
      else {
        wlist.set(location.state, wlist.get(location.state) + 1)
      }
      console.log(wlist) 
    }
  }, []);

  const handleseemore = (category) => {
    setseemore(category);
  }

  const handleseeless = () => {
    setseemore("");
  }
 
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
        <div>
          {categories.map((category) => {
            return (
              <div 
                className={classes.contentCategory}
                style={{
                  backgroundColor: color[categories.indexOf(category)%6],
                }}
              >
                <div style={{width: "40%", textAlign: "center"}}>
                  <Typography style={{textTransform: "uppercase", fontWeight: "bolder"}} variant="h3" gutterBottom> 
                    {category}
                  </Typography>
                  {seemore == category ? (
                    <Button onClick={handleseeless} variant="contained" style={{backgroundColor: "rgba(255, 255, 255, 0.3)"}} >
                      See less
                    </Button>
                  ) : (
                    <Button onClick={() => handleseemore(category)} variant="contained" style={{backgroundColor: "rgba(255, 255, 255, 0.3)"}} >
                      See more
                    </Button>
                  )}
                  
                </div>
                <Grid
                  className={classes.grid}
                  container
                  spacing={3}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {List.get(category).length == 0 ? (
                    <Typography variant="h6" style={{marginLeft: "auto", marginRight: "auto"}}> 
                      No product
                    </Typography>
                  ) : List.get(category).map((product) => {
                    if(List.get(category).indexOf(product) >= 4 && category != seemore){
                      return;
                    } 
                    return (
                      <Grid key={product.id} item md={3} xs={3}>
                        <Card
                          onClick={() => {
                            history.push(`/products/${product.id}`);
                          }}
                          className={classes.cardContainer}
                          variant="outlined"
                          elevation={10}
                        >
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={`${product.picture}/preview.jpg`}
                              title={product.name}
                            />
                            <CardContent 
                              style={{
                                borderTop: "1px solid #f3f3f3",
                                backgroundColor: product.quantity > 0 ? "#fff" : "#f1f1f1",
                              }}
                            >
                              <Typography 
                                gutterBottom 
                                variant="body1" 
                                style={{
                                  fontSize: "16px", fontWeight: "bold", textAlign: "center",
                                }}
                                noWrap
                              >
                                {product.name}
                              </Typography>
                              <Typography 
                                variant="h6" 
                                component="h2"
                                color={product.quantity > 0 ? "primary" : "secondary"}
                              >
                                {product.quantity > 0 ? "AVAILABLE" : "UNAVAILABLE"}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            )
          })}
        </div>
      )}
      <div className={classes.bodyBtnOrder}>
        {wlist.size  == 0 ? (
          <Button className={classes.btnOrder} variant="contained" color="secondary">
            <AddShoppingCartIcon />
          </Button>
        ) : (
        <Button onClick={() => {history.push("/order/confirmation", wlist)}} className={classes.btnOrder} variant="contained" color="secondary">
          {wlist.size}
        </Button>
        )}
      </div>
    </div>
  );  
}
