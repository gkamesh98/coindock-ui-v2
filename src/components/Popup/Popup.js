import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
function Popup(props) {
  const handleClick = () => {
    props.buttonOnclick?.();
    props.setTrigger(false);
  };

  const useStyles = makeStyles({
    popup: {
      position: "fixed",
      top: 0,
      borderColor: "black",
      left: 0,
      width: "100%",
      backgroundColor: "#616161",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    popupInner: {
      fontSize: "16px",
      position: "relative",
      padding: "14px",
      width: "100%",
      maxWidth: "340px",
      backgroundColor: "#ffff",
      borderRadius: "10px",
    },
    button: {
      marginTop: "25px",
      alignItems: "center",
      marginLeft: "38%",
      color: "white",
    },
  });
  const classes = useStyles();
  return props.trigger ? (
    <div className={classes.popup}>
      <div className={classes.popupInner}>
        {props.children}
        <div className="d-flex justify-content-center cd-mt-39">
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleClick}
            disabled={props.disabled}
          >
            {props.buttonLable}
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
Popup.propTypes = {
  buttonOnclick: PropTypes.function,
  setTrigger: PropTypes.function,
  trigger: PropTypes.function,
  buttonLable: PropTypes.string,
  disabled: PropTypes.boolean,
  children: PropTypes.element,
};

export default Popup;
