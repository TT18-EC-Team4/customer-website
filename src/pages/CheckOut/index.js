import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
// import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import FinishPurchase from "../FinishPurchase";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import Review from "../Review";
import Header from "../Header";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  content: {
    paddingTop: "100px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function BookingCheckout({ history, location }) {
  const [info, setInfo] = React.useState({
    city: 0,
    district: 0,
    name: "",
    phone: "",
    address: "",
  });

  const steps = ["Delivery Address", "Order Detail", "Payment Method"];
  const productsOrder = location.state || [];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm info={info} setInfo={setInfo} />;
      case 1:
        return <Review products={productsOrder} info={info} />;
      case 2:
        let temp = 0;
        for (var i = 0; i < productsOrder.length; i++) {
          temp += productsOrder[i].cost * productsOrder[i].quantity;
        }
        return <PaymentForm total={temp} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleSubmit = (Step) => {
    setActiveStep(Step);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Fragment>
      <CssBaseline />
      <Header dataProductsOrder={productsOrder} />
      <main className={clsx(classes.layout, classes.content)}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            CHECKOUT
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel setActiveStep={setActiveStep}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === 0 ? (
              <AddressForm
                handleSubmit={handleSubmit}
                info={info}
                setInfo={setInfo}
              />
            ) : activeStep === steps.length ? (
              <FinishPurchase info={info} product={productsOrder} />
            ) : (
              <Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
}
