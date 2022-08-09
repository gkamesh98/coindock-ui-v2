import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

const useStyles = makeStyles({
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
  boxIndex: {},
});

function RecoveryBox(props) {
  return (
    <Box
      sx={{
        boxShadow: 1,
        flexGrow: 1,
        position: "relative",
        boxSizing: "border-box",
        width: [100, 65, 100],
        border: 1,
        borderColor: (theme: Theme) => theme.palette.secondary.main,
        borderRadius: "12px",
        justifyContent: "center",
        display: "flex",
      }}
    >
      {props.input ? (
        <MDInput type="text" value={props.code} name={props.index} required />
      ) : (
        <MDTypography display="block" fontWeight="regular" my={3}>
          {props?.code}
        </MDTypography>
      )}
      <MDTypography
        sx={{
          position: "absolute",
          top: "2px",
          left: "4px",
          margin: "0px",
          display: "block",
          fontWeight: "regular",
        }}
        label={props.index}
      >
        {props.index}
      </MDTypography>
    </Box>
  );
}

RecoveryBox.propTypes = {
  code: PropTypes.string,
  input: PropTypes.bool,
  index: PropTypes.integer,
};

export default RecoveryBox;
