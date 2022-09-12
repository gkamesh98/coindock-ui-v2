// react-router-dom components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton"; // Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout"; // Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Box, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import { UndoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetRandomRecoveryCodesQuery, usePutRecoveryCodesMutation } from "api/recoveryCodes";
import RecoveryBox from "shared/RecoveryBox";
import { useState } from "react";
import { useFormik } from "formik";
import Popup from "shared/Popup";

function Cover() {
  const navigate = useNavigate();

  const [buttonPopup, setButtonPopup] = useState(false);

  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const { data = [] } = useGetRandomRecoveryCodesQuery({}, { refetchOnMountOrArgChange: true });

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

  return (
    <CoverLayout image={bgImage}>
      <Grid item xs={11} sm={9} md={5} lg={4} xl={3.125}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={4.3}
            mt={-3}
            p={3}
            mb={1}
          >
            <MDTypography variant="h4" fontWeight="regular" color="white" textAlign="center">
              Please enter the recovery words on the same order to activate the CoinDock account.
            </MDTypography>
          </MDBox>
          <MDBox display="center" alignItems="center" ml={2}>
            <MDTypography display="block" variant="button" my={1} fontWeight="medium" textGradient>
              Steps {"3"} of {"3"}
            </MDTypography>
          </MDBox>
          <MDBox
            component="form"
            role="form"
            onSubmit={formik.handleSubmit}
            type="form"
            isValidating
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
                    navigate("/sign-up/recovery-codes");
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
      </Grid>
    </CoverLayout>
  );
}

export default Cover;
