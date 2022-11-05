// react-router-dom components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton"; // Authentication layout components
import { Box, Card, CardHeader, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { UndoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetRandomRecoveryCodesQuery, usePutRecoveryCodesMutation } from "api/recoveryCodes";
import RecoveryBox from "shared/RecoveryBox";
import { useState } from "react";
import { useFormik } from "formik";
import Popup from "shared/Popup";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { makeStyles } from "@mui/styles";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function AccountRecoveryCodesTest() {
  const navigate = useNavigate();

  const [buttonPopup, setButtonPopup] = useState(false);

  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const { data = [], isLoading } = useGetRandomRecoveryCodesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [recoveryTestCodes, { error }] = usePutRecoveryCodesMutation();

  const [keyResponse, setKeyResponse] = useState({});

  const handleOnClick = () => {
    if (displayErrorMessage) setDisplayErrorMessage(false);
  };

  const formik = useFormik({
    initialValues: keyResponse,
    enableReinitialize: true,
    onSubmit: (values) => {
      recoveryTestCodes({
        keyResponse: values,
      })
        .unwrap()
        .then(() => {
          navigate("/dashboard");
        })
        .catch((error) => {
          if (error.status === 400) {
            setButtonPopup(true);
          }
          if (error.status === 422) {
            setDisplayErrorMessage(true);
          }
        });
    },
  });

  const useStyles = makeStyles({
    button: {
      height: "15px",
      marginLeft: "20px",
      marginBottom: "20px",
    },

    card: {
      cursor: "pointer",
      minWidth: "300px",
      maxWidth: "550px",
      margin: "auto",
      marginTop: "30px",
      marginBottom: "20px",
      padding: "10px",
    },
  });

  const classes = useStyles();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? (
        <Box display="flex" width={0.5} justifyContent="center">
          <CircularProgress style={{ color: "blue" }} />
        </Box>
      ) : (
        <Card className={classes.card}>
          <CardHeader title="Please enter the recovery words on the same order to activate the CoinDock account." />

          <MDBox
            component="form"
            role="form"
            onSubmit={formik.handleSubmit}
            type="form"
            onClick={handleOnClick}
          >
            {displayErrorMessage ? (
              <MDBox variant="gradient" borderRadius="lg" px={2}>
                <MDTypography display="block" mt={1} color="error">
                  {"*" + error?.data?.message.substring(0, error?.data?.message.indexOf(".")) + "."}
                </MDTypography>
              </MDBox>
            ) : null}
            <MDBox mt={6} display="grid">
              <Box
                sx={1}
                mt={-2}
                ml={4}
                onInput={(event) => {
                  setKeyResponse((keyResponse) => {
                    return { ...keyResponse, [event.target.name]: event?.target.value };
                  });
                }}
              >
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {data.map((value, number) => {
                    return (
                      <Grid item xs={2} sm={4} md={4} key={number}>
                        <RecoveryBox
                          key={value}
                          name={value.toString()}
                          index={value}
                          submitEvent={true}
                          input={true}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </MDBox>

            <Grid container spacing={2} mt={9} mx={-4} mb={5} textAlign="center">
              <Grid item xs>
                <UndoOutlined
                  fontSize="large"
                  variant="gradient"
                  color="info"
                  id="confirm"
                  onClick={() => {
                    navigate("/account/recovery");
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <MDButton variant="gradient" color="info" id="confirm" type="submit">
                  confirm
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>

          <Popup trigger={buttonPopup} setTrigger={setButtonPopup} buttonLable="OK">
            <MDBox variant="gradient" borderRadius="lg" pt={2} pb={2} px={2}>
              <MDTypography display="block" mt={1}>
                {error?.data?.error?.message ?? ""}
              </MDTypography>
            </MDBox>
          </Popup>
        </Card>
      )}
    </DashboardLayout>
  );
}

export default AccountRecoveryCodesTest;
