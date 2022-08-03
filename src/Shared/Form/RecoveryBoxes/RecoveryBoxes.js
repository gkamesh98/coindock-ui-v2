import { chainPropTypes } from "@mui/utils";
/* eslint-disable react/prop-types */

import React from "react";

import Box from "@mui/material/Box";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  box: {
    position: "relative",
    boxSizing: "border-box",
    width: "82px",
    height: "65px",
    background: "#ffffff",
    border: "1px solid #0080b1",
    borderRadius: "10px",
    justifyContent: "center",
    margin: "6px",
    display: "flex",
    flex: "auto",
  },
  boxDate: {
    margin: "0px",
    justifyContent: "center",
    height: "fir-content",
    padding: "20px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
  input: {
    padding: "20px",
    boxSizing: "content-box",
    display: "block",
    width: "100%",
    border: "indigo",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
  boxIndex: {
    position: "absolute",
    top: "2px",
    left: "4px",
    margin: "0px",
  },
});

function RecoveryBoxs(props) {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.box}>
      {props.input ? (
        <input className={classes.input} type="text" value={props.code} name={props.index} />
      ) : (
        <p className={classes.boxDate}>{props?.code}</p>
      )}
      <p className={classes.boxIndex}>{props.index}</p>
    </Box>
  );
}

export default RecoveryBoxs;
