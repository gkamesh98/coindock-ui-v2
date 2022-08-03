import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // @mui material components

import { useFormik } from "formik";
import * as Yup from "yup";
import MDBox from "components/MDBox";
import { useAccount } from "api/accapi";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Authentication layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccountData } from "api/accapi";
import MDTypography from "components/MDTypography";

function ProfileName() {
  const { data: account } = useAccount();
  const [isValid, setValid] = useState(false);
  const accountDetails = account?.user || {};
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(45)
      .required(),
    lastName: Yup.string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(45)
      .required(),
  });
  const handleOnChange = () => {
    setValid(true);
  };

  const [getData] = useAccountData();
  const navigate = useNavigate();
  const initialValues = { firstName: accountDetails.firstName, lastName: accountDetails.lastName };
  const onSubmit = (values) => {
    console.log(values);
    getData({
      ...values,
    })
      .unwrap()
      .then(() => {
        navigate("/profile-settings");
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography px={3} ml={4}>
        Edit Name
      </MDTypography>
      <MDBox pt={4} pb={3} px={3} ml={4} sx={4} md={6} lg={12}>
        <MDBox
          component="form"
          role="form"
          onSubmit={formik.handleSubmit}
          onChange={handleOnChange}
        >
          <MDBox mb={3}>
            <MDInput label="First Name" {...formik.getFieldProps("firstName")} />
            {formik?.errors?.firstName ? (
              <div style={{ fontSize: "16px", color: "red" }}>{formik?.errors?.firstName}</div>
            ) : null}
          </MDBox>
          <MDBox mb={3}>
            <MDInput type="lastName" label="Last Name" {...formik.getFieldProps("lastName")} />
            {formik?.errors?.lastName ? (
              <div style={{ fontSize: "16px", color: "red" }}>{formik?.errors?.lastName}</div>
            ) : null}
          </MDBox>

          <MDBox mt={4} mb={1}>
            <MDButton disabled={!isValid} variant="gradient" color="info" type="submit">
              Submit
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default ProfileName;
