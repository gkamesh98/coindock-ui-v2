import React from "react";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import { Dialog } from "@mui/material";

function Popup(props) {
  const handleClick = () => {
    props.buttonOnclick?.();
    props.setTrigger(false);
  };

  return (
    <Dialog
      open={props.trigger}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      onClose={handleClick}
      PaperProps={{
        style: {
          overflowY: "visible",
        },
      }}
    >
      <Card>
        {props.children}
        <MDBox mb={1}>
          <MDButton
            variant="gradient"
            color="info"
            type="submit"
            sx={{ m: 1, minWidth: 396, marginLeft: 3 }}
            onClick={handleClick}
            disabled={props.disabled}
          >
            {props.buttonLable}
          </MDButton>
        </MDBox>
      </Card>
    </Dialog>
  );
}

Popup.propTypes = {
  buttonLable: PropTypes.string,
  trigger: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.element,
  buttonOnclick: PropTypes.func,
  setTrigger: PropTypes.func,
};

export default Popup;
