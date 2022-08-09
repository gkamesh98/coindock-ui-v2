import React from "react";
import { useNavigate } from "react-router-dom"; // @mui material components
import { useFormik } from "formik";
import * as Yup from "yup";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Authentication layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccountData } from "api/accapi";

function Accountpassword() {
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const [putData] = useAccountData();
  const navigate = useNavigate();
  const initialValues = { password: "" };
  const onSubmit = (values, actions) => {
    console.log(values);
    putData({
      ...values,
    })
      .unwrap()
      .then(() => {
        navigate("/account-settings");
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
      <MDTypography ml={3} mb={-2}>
        Change Password
      </MDTypography>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
          <MDBox mb={2}>
            <MDInput type="password" label="Password" {...formik.getFieldProps("password")} />
            {formik?.errors?.password ? (
              <div style={{ fontSize: "16px", color: "red" }}>{formik?.errors?.password}</div>
            ) : null}
          </MDBox>

          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="info" type="submit">
              Submit
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Accountpassword;
