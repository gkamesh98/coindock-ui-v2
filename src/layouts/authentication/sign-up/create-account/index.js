// react-router-dom components
import { Link } from "react-router-dom"; // @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout"; // Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Autocomplete, Card, Grid } from "@mui/material";
import { useCountry } from "api/accapi";
import { useNavigate } from "react-router-dom";

function Cover() {
  const { data = [] } = useCountry();

  const navigate = useNavigate();

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
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Join us today
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter your details to register
            </MDTypography>
          </MDBox>
          <MDBox display="center" alignItems="center" ml={2}>
            <MDTypography display="block" variant="button" my={1} fontWeight="medium" textGradient>
              Steps {"1"} of {"3"}
            </MDTypography>
          </MDBox>
          <MDBox pt={3} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput type="text" label="First Name" variant="standard" fullWidth required />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="text" label="Last Name" variant="standard" fullWidth required />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="Date"
                  label="Date of Birth"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={2}>
                <Autocomplete
                  disablePortal
                  options={data}
                  renderInput={(params) => (
                    <MDInput
                      type="text"
                      {...params}
                      label="Country"
                      variant="standard"
                      fullWidth
                      required
                    />
                  )}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="email" label="Email" variant="standard" fullWidth required />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  variant="standard"
                  id="password1"
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Re-enter Password"
                  variant="standard"
                  id="password2"
                  fullWidth
                  required
                />
              </MDBox>

              <MDBox display="center" alignItems="center" ml={-1}>
                <MDTypography display="block" variant="button" my={1} textGradient>
                  By clicking on confirm, you agree to the CoinDock terms and conditions
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={2}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  id="confirm"
                  onClick={() => {
                    navigate("/authentication/sign-up/recovery-codes");
                  }}
                  // href="/authentication/sign-up/recovery-codes"
                >
                  confirm
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                    id="sign-up"
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </CoverLayout>
  );
}
export default Cover;
