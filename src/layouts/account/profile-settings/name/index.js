import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // @mui material components
import { useFormik } from "formik";
import * as Yup from "yup";
import MDBox from "components/MDBox";
import { useAccount, useAccountData } from "api/accapi";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Authentication layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import { Box, Card, CardContent, CardHeader, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

function ProfileName() {
  const { data: account, isLoading } = useAccount();

  const [isValid, setValid] = useState(false);

  const accountDetails = account?.user || {};

  const [putData] = useAccountData();

  const navigate = useNavigate();

  const initialValues = { firstName: accountDetails.firstName, lastName: accountDetails.lastName };

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

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setFieldError }) => {
      putData({
        ...values,
      })
        .unwrap()
        .then(() => {
          navigate("/profile-settings");
        })
        .catch((error) => {
          if (error.status === 422) {
            Object.entries(error?.data?.errors).forEach(([index, value]) =>
              setFieldError(index, value)
            );
          }
        });
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .max(45)
        .required("First name is required"),
      lastName: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .max(45)
        .required("Last name is required"),
    }),
    enableReinitialize: true,
  });

  useEffect(() => {
    formik.values.firstName != accountDetails.firstName ||
    formik.values.lastName != accountDetails.lastName
      ? setValid(true)
      : setValid(false);
  }, [formik.values.firstName, formik.values.lastName]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? (
        <Box display="flex" widht={1} justifyContent="center">
          <CircularProgress style={{ color: "blue" }} />
        </Box>
      ) : (
        <Card className={classes.card}>
          <CardHeader title="Edit Your Name" />
          <CardContent>
            <MDBox pt={4} pb={3} px={3} component="form" role="form" onSubmit={formik.handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="First Name"
                  name="firstName"
                  variant="standard"
                  fullWidth
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
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik?.errors?.lastName ? (
                  <MDTypography color="error" fontSize="12px">
                    {formik?.errors?.lastName}
                  </MDTypography>
                ) : null}
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  disabled={!isValid}
                  color="info"
                  type="submit"
                  onClick={formik.handleSubmit}
                >
                  Submit
                </MDButton>
              </MDBox>
            </MDBox>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}

export default ProfileName;
