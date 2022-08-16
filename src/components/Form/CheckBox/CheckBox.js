import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
/* eslint-disable react/prop-types */
function Checkbox(props) {
  const useStyles = makeStyles({
    checkboxContainer: {
      display: "flex",
      width: "100%",
      height: "40px",
    },
    checkBox: {
      borderRadius: "0em",
      border: "5px solid #09bbff",
      width: "20px",
      height: "20px",
      marginLeft: "5%",
      boxSizing: "border-box",
      backgroundColor: "#28363c",
      display: "inline-block",
      visibility: "visible",
      boxShadow: "0 0 0 1px #09bbff, 0 0 0 0.2rem #09bbff",
    },
    label: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      textAlign: "right",
      width: "350px",
      marginBottom: "10px",
      fontWeight: "400",
      fontSize: "18px",
      color: " #000000",
      fontFamily: "Times New Roman,serif",
    },
  });
  const classes = useStyles();
  const [checked, setChecked] = useState(props.checked);
  const handleOnChange = (event) => {
    if (props.onChange) {
      props.onChange(event);
    }
    setChecked((checked) => !checked);
  };

  return (
    <div className={classes.checkboxContainer}>
      <input
        type="checkbox"
        id="Checkbox"
        className={classes.checkBox}
        checked={checked}
        onChange={handleOnChange}
      />

      <label htmlFor="Checkbox" className={classes.label}>
        {" "}
        {props.label}
      </label>
    </div>
  );
}

export default Checkbox;
