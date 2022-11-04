import React from "react";
import { useNavigate } from "react-router-dom"; // @mui material components
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Authentication layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccountData } from "api/accapi";
import { Card, CardContent, CardHeader } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";

function Accountpassword() {
  const [putData] = useAccountData();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      reEnterPassword: "",
    },
    validationSchema: yup.object({
      password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Password is required"),
      reEnterPassword: yup
        .string("Enter your Re-enter password")
        .min(8, "Re-enter password should be of minimum 8 characters length")
        .oneOf([yup.ref("password")], "Re-enter password must must match with password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Re-enter password is required"),
    }),

    onSubmit: (values, { setFieldError }) => {
      putData({
        ...values,
      })
        .unwrap()
        .then(() => {
          navigate("/account-settings");
        })
        .catch((error) => {
          if (error.status === 422) {
            Object.entries(error?.data?.errors).forEach(([index, value]) =>
              setFieldError(index, value)
            );
          }
        });
    },
  });

  const useStyles = makeStyles({
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
      <Card className={classes.card}>
        <CardHeader title="Change Password" />
        <CardContent>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  name="New Password"
                  type="password"
                  value={formik.values?.password}
                  label="New Password"
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
                  name="Re-enter New Password"
                  type="password"
                  value={formik.values?.reEnterPassword}
                  label="Re-enter New Password"
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

              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" type="submit">
                  Submit
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default Accountpassword;
