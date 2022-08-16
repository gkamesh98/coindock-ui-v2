import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import RecoveryBoxs from "components/Form/RecoveryBoxes";
import { usePutRecoveryCodesMutation, useGetRandomRecoveryCodesQuery } from "api/recoveryCodes";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Popup from "components/Popup/Popup";
import MDTypography from "components/MDTypography";
import { Button } from "@mui/material";

function RecoveryCodeTestStepAccount() {
  const navigate = useNavigate();

  const { data = [], isLoading } = useGetRandomRecoveryCodesQuery();

  const [recoveryTestCodes, { error }] = usePutRecoveryCodesMutation();

  const [formValues, setformValues] = useState({
    key_response: {},
  });
  const useStyles = makeStyles({
    button: {
      marginTop: "4%",
      marginLeft: "5%",
      color: "white",
    },
    button1: {
      marginTop: "4%",
      marginLeft: "21%",
      color: "white",
    },
    paper: {
      marginLeft: "14%",
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
  });
  const classes = useStyles();
  const [buttonPopup, setButtonPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recoveryTestCodes({ userId: 1, ...formValues }).unwrap();

      navigate("/account");
    } catch (error) {
      if (error.status === 400) {
        setButtonPopup(true);
      }
    }
  };

  const handleOnInput = (event) => {
    setformValues((formValues) => {
      formValues.key_response[event.target.name] = event.target.value;
      return formValues;
    });
  };

  const recoveryCodes = data?.results;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className={classes.paper}>
        <div className={classes.paperContainer}>
          <form onInput={handleOnInput}>
            <MDTypography className={classes.headerContent}>
              Please enter the recovery words on the same
            </MDTypography>
            <MDTypography
              style={{ marginLeft: "5%", fontFamily: "Times New Roman,serif", fontSize: "20px" }}
            >
              order to activate the CoinDock account.
            </MDTypography>
            {isLoading ? (
              <Box display="flex" widht={1} justifyContent="center">
                <CircularProgress style={{ color: "blue" }} />
              </Box>
            ) : (
              <div className={classes.table}>
                {Boolean(recoveryCodes) &&
                  recoveryCodes.map((index, number) => (
                    <Grid item md={2} key={index}>
                      <RecoveryBoxs
                        key={index}
                        index={number + 1}
                        submitEvent={true}
                        input={true}
                      />
                    </Grid>
                  ))}
              </div>
            )}
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                navigate("/recovery-codes-account");
              }}
            >
              Back
            </Button>
            <Button variant="contained" className={classes.button1} onClick={handleSubmit}>
              Confirm
            </Button>
          </form>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup} buttonLable="OK">
            <p>{error?.data?.error?.message}</p>
          </Popup>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default RecoveryCodeTestStepAccount;
