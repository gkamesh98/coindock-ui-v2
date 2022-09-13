import propTypes from "prop-types";
import React from "react";
import Box from "@mui/material/Box";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

function RecoveryBox(props) {
  return (
    <Box
      sx={{
        boxShadow: 1,
        flexGrow: 1,
        position: "relative",
        width: [100, 65, 100],
        justifyContent: "center",
        display: "flex",
      }}
    >
      {props.input ? (
        <MDInput
          type="text"
          my={3}
          value={props.code}
          name={props.name}
          required
          sx={{
            position: "absolute",
            top: "2px",
            left: "0px",
            display: "block",
            fontWeight: "regular",
            textAlign: "center",
          }}
        />
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
        }}
        fontWeight="light"
        variant="h6"
        label={props.index}
      >
        {props.index}
      </MDTypography>
    </Box>
  );
}

RecoveryBox.propTypes = {
  code: propTypes.string,
  input: propTypes.bool,
  index: propTypes.number.isRequired,
  name: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default RecoveryBox;
