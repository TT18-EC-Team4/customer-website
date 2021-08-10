import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
// import Icon from '@material-ui/core/Icon';
import CropFreeIcon from '@material-ui/icons/CropFree';
import Momo from '../../img/momo.jpg'

const useStyles = makeStyles((theme) => ({
  content: {
    color: '#fff',
    backgroundColor: '#cc0099',
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
  },
  cover: {
    width: '260px',
    height: '260px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  mlauto: {
    marginLeft: 'auto',
  },
  mrauto: {
    marginRight: 'auto'
  },
}));

export default function PaymentForm({ total }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Phương thức thánh toán
      </Typography>
      <Grid container spacing={3}>
        <Grid className={clsx(classes.content, classes.controls)} item xs={12}>
          <CropFreeIcon className={classes.mlauto} /> 
          <Typography className={classes.mrauto} variant="h6">
            Sử dụng app MoMo quét mã thanh toán
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            className={classes.cover}
            image={Momo}
            title="Live from space album cover"
          />
          {/* <img className={classes.cover} src="/react-app/img/momo.jpg" alt="QR-code" /> */}
        </Grid>
        <Grid className={classes.content} item xs={12}>
          <Typography gutterBottom>
            Người nhận: Đỗ Khắc Minh Nhật - 0387594646
          </Typography>
          <Typography gutterBottom>
            Số tiền đơn hàng: {total} VND
          </Typography>
          <Typography gutterBottom>
            Ghi chú chuyển tiền nhập mã đơn hàng: #3456
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}