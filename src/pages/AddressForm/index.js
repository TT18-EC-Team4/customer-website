import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
}));

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

export default function AddressForm({ handleSubmit, info, setInfo }) {
  const classes = useStyles();
  // const [City, setCity] = React.useState(0);
  // const [District, setDistrict] = React.useState(0);
  // const [Name, setName] = React.useState("");
  // const [Phone, setPhone] = React.useState("");
  // const [Address, setAddress] = React.useState("");

  useEffect(() => {
    setInfo({ ...info, city: 0, district: 0 });
  }, []);

  const [NameError, setNameError] = React.useState(false);
  const [PhoneError, setPhoneError] = React.useState(false);
  const [AddressError, setAddressError] = React.useState(false);
  const handleChangeCity = (event) => {
    setInfo({ ...info, city: event.target.value, district: 0 });
  };

  const handleChangeDistrict = (event) => {
    setInfo({ ...info, district: event.target.value });
  };

  const handleClick = () => {
    setNameError(false);
    setPhoneError(false);
    setAddressError(false);
    if (info.name === "") {
      setNameError(true);
    }
    if (info.phone === "") {
      setPhoneError(true);
    }
    if (info.address === "") {
      setAddressError(true);
    }
    if (info.name !== "" && info.phone !== "" && info.address !== "") {
      // const tmpCity = Cities[info.city].label;
      // const tmpDis = Districts[info.city][info.district].label;
      // setInfo({ ...info, city: tmpCity, district: tmpDis });
      handleSubmit(1);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Địa chỉ giao hàng
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
            required
            id="Name"
            name="Name"
            label="Full Name"
            fullWidth
            error={NameError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            required
            id="Phone"
            name="Phone"
            label="Phone Number"
            fullWidth
            error={PhoneError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            required
            id="Address"
            name="Address"
            label="Address"
            fullWidth
            error={AddressError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-select-cities"
            select
            label="City/Province"
            fullWidth
            value={info.city}
            onChange={handleChangeCity}
          >
            {Cities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-select-districts"
            select
            label="District"
            fullWidth
            value={info.district}
            onChange={handleChangeDistrict}
          >
            {Districts[info.city].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          className={classes.button}
        >
          Next
        </Button>
      </div>
    </React.Fragment>
  );
}
