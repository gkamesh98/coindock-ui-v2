// react-router-dom components
import { Link } from "react-router-dom"; // @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout"; // Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Autocomplete, Card, Grid } from "@mui/material";
import { useCountry } from "api/account";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useRefresh } from "api/auth";
import { usePostRegisterMutation } from "api/signup";
import Popup from "shared/popup";
import Lock from "assets/images/Lock.png";

const validationSchema = yup.object({
  firstName: yup.string("Enter your first name").required("First name is required"),
  lastName: yup.string("Enter your last name").required("Last name is required"),
  dateOfBirth: yup.string("Enter your Date of Birth").required("Date of Birth is required"),
  country: yup.string("Enter your country").required("Country is required"),
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  reEnterPassword: yup
    .string("Enter your Re-enter password")
    .min(8, "Re-enter password should be same as password")
    .required("Re-enter password is required"),
});

function Cover() {
  const navigate = useNavigate();

  const [buttonPopup, setButtonPopup] = useState(false);
  const [refresh] = useRefresh();

  const { data = [] } = useCountry();

  const [register] = usePostRegisterMutation();

  const handleSuccessPopupButtonClick = () => {
    refresh()
      .unwrap()
      .then(() => {
        navigate("/sign-up/recovery-codes");
      });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      country: "",
      email: "",
      password: "",
      reEnterPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      register({
        ...values,
      })
        .unwrap()
        .then(() => {
          setButtonPopup(true);
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
            <MDBox
              component="form"
              role="form"
              onSubmit={formik.handleSubmit}
              type="form"
              // onSubmit={formik.handleSubmit}
              // onInput={formik.handleChange}
              isValidating
            >
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="First Name"
                  name="firstName"
                  variant="standard"
                  fullWidth
                  required
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik?.errors?.firstName ? (
                  <MDTypography color="error" fontSize="12px">
                    {formik?.errors?.firstName}
                  </MDTypography>
                ) : null}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Last Name"
                  name="lastName"
                  variant="standard"
                  fullWidth
                  required
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik?.errors?.lastName ? (
                  <MDTypography color="error" fontSize="12px">
                    {formik?.errors?.lastName}
                  </MDTypography>
                ) : null}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  name="dateOfBirth"
                  type="Date"
                  label="Date of Birth"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  {...formik.getFieldProps("dateOfBirth")}
                />
                {formik.touched.dateOfBirth && formik?.errors?.dateOfBirth ? (
                  <MDTypography color="error" fontSize="12px">
                    {formik?.errors?.dateOfBirth}
                  </MDTypography>
                ) : null}
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
                      name="country"
                      variant="standard"
                      fullWidth
                      required
                      {...formik.getFieldProps("country")}
                    />
                  )}
                />
                {formik.touched.country && formik?.errors?.country ? (
                  <MDTypography color="error" fontSize="12px">
                    {formik?.errors?.country}
                  </MDTypography>
                ) : null}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  value={formik.values?.email}
                  label="Email"
                  name="email"
                  variant="standard"
                  fullWidth
                  required
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik?.errors?.email ? (
                  <MDTypography color="error" fontSize="12px">
                    {formik?.errors?.email}
                  </MDTypography>
                ) : null}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  name="password"
                  type="password"
                  value={formik.values?.password}
                  label="Password"
                  variant="standard"
                  id="password1"
                  fullWidth
                  required
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik?.errors?.password ? (
                  <MDTypography color="error" fontSize="12px">
                    {formik?.errors?.password}
                  </MDTypography>
                ) : null}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  name="reEnterPassword"
                  type="password"
                  value={formik.values?.reEnterPassword}
                  label="Re-enter Password"
                  variant="standard"
                  id="password2"
                  fullWidth
                  required
                  {...formik.getFieldProps("reEnterPassword")}
                />
                {formik.touched.reEnterPassword && formik?.errors?.reEnterPassword ? (
                  <MDTypography color="error" fontSize="12px">
                    {formik?.errors?.reEnterPassword}
                  </MDTypography>
                ) : null}
              </MDBox>

              <MDBox display="center" alignItems="center" ml={-1}>
                <MDTypography display="block" variant="button" my={1} textGradient>
                  By clicking on confirm, you agree to the CoinDock terms and conditions
                </MDTypography>
              </MDBox>

              <MDButton
                mt={4}
                mb={2}
                variant="contained"
                color="info"
                fullWidth
                id="confirm"
                type="submit"
              >
                confirm
              </MDButton>

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

          <Popup
            trigger={buttonPopup}
            setTrigger={() => {
              handleSuccessPopupButtonClick();
            }}
            buttonLable="OK"
          >
            <MDBox variant="gradient" borderRadius="lg" pt={2} pb={2} px={2}>
              <MDTypography variant="h4" fontWeight="medium" mt={1}>
                Account recovery information
              </MDTypography>
              <MDBox component="img" src={Lock} alt="lock-image" width="10%" mr={2} mt={1} mb={1} />

              <MDTypography display="block" mt={1}>
                We’re going to display the account recovery information on the next screen. Please
                ensure that you have good internet connection and no individual is watching.
              </MDTypography>
            </MDBox>
          </Popup>
        </Card>
      </Grid>
    </CoverLayout>
  );
}
export default Cover;
