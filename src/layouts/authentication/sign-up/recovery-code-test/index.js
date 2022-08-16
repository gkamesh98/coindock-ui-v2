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
import RecoveryBox from "shared/recovery-box";
import { useState } from "react";
import { useFormik } from "formik";

function Cover() {
  const navigate = useNavigate();

  const [buttonPopup, setButtonPopup] = useState(false);

  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const { data = [] } = useGetRandomRecoveryCodesQuery({}, { refetchOnMountOrArgChange: true });

  const [recoveryTestCodes, { error }] = usePutRecoveryCodesMutation();

  const [keyResponse, setKeyResponse] = useState({});

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
          console.log(error);
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
          <MDBox
            component="form"
            role="form"
            onSubmit={formik.handleSubmit}
            type="form"
            isValidating
          >
            <MDBox mt={6} display="grid">
              <Box
                sx={1}
                mt={5}
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
                          name={value}
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

            <Grid container spacing={2} mt={3} mx={-4} mb={1} textAlign="center">
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
        </Card>
      </Grid>
    </CoverLayout>
  );
}

export default Cover;
