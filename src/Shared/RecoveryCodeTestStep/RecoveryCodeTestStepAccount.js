import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import RecoveryBoxs from "Shared/Form/RecoveryBoxes";
import { usePutRecoveryCodesMutation, useGetRandomRecoveryCodesQuery } from "api/recoveryCodes";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Popup from "Shared/Popup/Popup";
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
      marginLeft: "4%",
      color: "white",
    },
    label: {
      marginLeft: "3%",
    },
    checkbox: {
      marginLeft: "3%",
    },
    download: {
      marginBottom: "2%",
      marginTop: "2%",
      marginLeft: "3%",
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

      <form onInput={handleOnInput}>
        <MDTypography className={classes.label}>
          Please enter the recovery words on the same order to activate the CoinDock account.
        </MDTypography>
        {isLoading ? (
          <Box display="flex" widht={1} justifyContent="center">
            <CircularProgress style={{ color: "blue" }} />
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1 }} mt={5} ml={4}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Boolean(recoveryCodes) &&
                recoveryCodes.map((index, number) => (
                  <Grid item md={2} key={index}>
                    <RecoveryBoxs key={index} index={number + 1} submitEvent={true} input={true} />
                  </Grid>
                ))}
            </Grid>
          </Box>
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
        <Button variant="contained" className={classes.button} onClick={handleSubmit}>
          Confirm
        </Button>
      </form>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} buttonLable="OK">
        <p>{error?.data?.error?.message}</p>
      </Popup>
    </DashboardLayout>
  );
}

export default RecoveryCodeTestStepAccount;
