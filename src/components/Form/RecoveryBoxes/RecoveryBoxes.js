/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  box: {
    position: "relative",
    boxSizing: "border-box",
    width: "79px",
    height: "65px",
    background: "#ffffff",
    border: "1px solid #0080b1",
    borderRadius: "10px",
    justifyContent: "center",
    margin: "5px",
    display: "flex",
    flex: "auto",
  },
  boxData: {
    margin: "0px",
    justifyContent: "center",
    height: "fit-content",
    padding: "20px",
    fontSize: "16px",
    fontFamily: "Times New Roman,serif",
  },
  input: {
    padding: "20px",
    boxSizing: "content-box",
    display: "block",
    width: "100%",
    border: "indigo",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "Times New Roman,serif",
  },
  boxIndex: {
    position: "absolute",
    top: "2px",
    left: "4px",
    fontSize: "15px",
    margin: "0px",
  },
});

function RecoveryBoxs(props) {
  const classes = useStyles();
  return (
    <div className={classes.box}>
      {props.input ? (
        <input className={classes.input} type="text" value={props.code} name={props.index} />
      ) : (
        <p className={classes.boxData}>{props?.code}</p>
      )}
      <p className={classes.boxIndex}>{props.index}</p>
    </div>
  );
}

export default RecoveryBoxs;
