import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CardHeader } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    margin: "0 auto",
    width: "100%"
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  media: {
    backgroundSize: 'contain',
    margin: "2.5%",
    paddingTop: "56.25%" // 16:9
  }
}));

export default function Categories