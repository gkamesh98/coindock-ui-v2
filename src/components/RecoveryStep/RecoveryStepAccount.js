import React, { useState } from "react";
/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import RecoveryBoxs from "components/Form/RecoveryBoxes";
import Checkbox from "components/Form/CheckBox/CheckBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DownloadRecoverykeys from "components/Form/DownloadRecoverykeys";
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
      width: "50px",
      height: "20px",
      display: "flex",
      justifyContent: "center",
      marginTop: "1%",
      marginLeft: "4%",
      color: "white",
    },

    paper: {
      marginLeft: "6%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    paperContainer: {
      minWidth: "400px",
      width: "100%",
      height: "100%",
    },
    headerContent: {
      marginLeft: "5%",
      width: "335px",
      height: "87px",
      left: "14px",
      top: "141px",
      display: "inline",
      fontWeight: "400",
      fontSize: "20px",
      lineHeight: "160%",
      fontFamily: "Times New Roman,serif",
    },
    table: {
      display: "flex",
      marginTop: 30,
      marginLeft: "5%",
      flexFlow: "wrap",
      height: "auto",
      listStyle: "none",
    },

    download: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      flexDirection: "row",
      fontFamily: "Times New Roman,serif",
      marginBottom: "3%",
      marginTop: "3%",
    },
  });
  const classes = useStyles();
  const recoveryCodes = data?.data?.results.recoveryCode.recoveryCodes;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className={classes.paper}>
        <div className={classes.paperContainer}>
          <MDTypography className={classes.headerContent}>
            Please note down the below recovery words in the same order and keep it securely
          </MDTypography>

          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress style={{ color: "blue" }} />
            </Box>
          ) : (
            <div className={classes.table}>
              {Boolean(recoveryCodes) &&
                recoveryCodes.map((value, number) => (
                  <Grid sx={8} md={3} key={number}>
                    <RecoveryBoxs key={number} index={number + 1} code={value} />
                  </Grid>
                ))}
            </div>
          )}
          <div className={classes.download}>
            <DownloadRecoverykeys />
          </div>
          <Checkbox
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
        </div>
      </div>
    </DashboardLayout>
  );
}

export default RecoveryCodeBoxStepAccount;
