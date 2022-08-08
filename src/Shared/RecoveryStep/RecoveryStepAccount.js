import React, { useState } from "react";
/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import RecoveryBoxs from "Shared/Form/RecoveryBoxes";
import Checkbox from "Shared/Form/CheckBox/CheckBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DownloadRecoverykeys from "Shared/Form/DownloadRecoverykeys";
import { usePostRecoveryCodesQuery } from "api/recoveryCodes";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MDTypography from "components/MDTypography";

function RecoveryCodeBoxStepAccount() {
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const { data = [], isLoading } = usePostRecoveryCodesQuery();

  const handleOnSubmit = () => {
    navigate("/recovery-test-account");
  };

  const handleOnCheckBoxChange = () => {
    setChecked((checked) => !checked);
  };

  const useStyles = makeStyles({
    button: {
      marginTop: "1%",
      marginLeft: "2%",
      color: "white",
    },
    label: {
      marginLeft: "3%",
    },
    checkbox: {
      marginLeft: "3%",
    },
    download: {
      marginBottom: "3%",
      marginTop: "2%",
      marginLeft: "3%",
    },
  });
  const classes = useStyles();
  const recoveryCodes = data?.data?.results.recoveryCode.recoveryCodes;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography className={classes.label}>
        Please note down the below recovery words in the same order and keep it securely
      </MDTypography>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress style={{ color: "blue" }} />
        </Box>
      ) : (
        <Box mt={1} ml={3}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Boolean(recoveryCodes) &&
              recoveryCodes.map((value, number) => (
                <Grid item md={3} key={number}>
                  <RecoveryBoxs key={number} index={number + 1} code={value} />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
      <div className={classes.download}>
        <DownloadRecoverykeys />
      </div>
      <Checkbox
        className={classes.checkbox}
        label="Yes, I noted down the recovery words securely"
        checked={checked}
        onChange={handleOnCheckBoxChange}
      />
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleOnSubmit}
        disabled={!checked}
      >
        Next
      </Button>
    </DashboardLayout>
  );
}

export default RecoveryCodeBoxStepAccount;
