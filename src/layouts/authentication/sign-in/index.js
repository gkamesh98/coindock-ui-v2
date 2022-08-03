// react-router-dom components
import { Link, useNavigate } from "react-router-dom"; // @mui material components
import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link"; // @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google"; // Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout"; // Images
import { useLogin } from "api/auth";
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is not Valid").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

function Basic() {
  const [login, loginOptions] = useLogin();
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const onSubmit = (values, actions) => {
    console.log(values);
    login({
      ...values,
    })
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <BasicLayout>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth {...formik.getFieldProps("email")} />
              {formik.touched.email && formik?.errors?.email ? (
                <div>{formik?.errors?.email}</div>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik?.errors?.password ? (
                <div>{formik?.errors?.password}</div>
              ) : null}
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}
export default Basic;
