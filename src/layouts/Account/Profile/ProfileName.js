import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Typography from "@mui/material/Typography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useAccountData, useAccount } from "api/accapi";
import { Button } from "@mui/material";

function ProfileName() {
  const { data: account } = useAccount();
  const navigate = useNavigate();
  const accountDetails = account?.data?.results?.user || {};
  const initialValues = {
    first_name: accountDetails.first_name,
    last_name: accountDetails.last_name,
  };

  const validate = (values, label = "Name", length = 0) => {
    const errors = {};
    if (!values.first_name) {
      errors.first_name = "Required";
    }
    if (!values.last_name) {
      errors.last_name = "Required";
    } else if (values.length > 45) {
      errors = ` The ${label} may not be greater than ${length} characters.`;
    }
    return errors;
    // setValid(isValid);
    // return {
    //   isValid,
    //   errors,
    // };
  };
  const [isValid, setValid] = useState(false);
  const [getData] = useAccountData();
  const onSubmit = (values) => {
    console.log(values);
    // getData({
    //   ...values,
    // })
    //   .unwrap()
    //   .then(() => {
    //     navigate("/profile-settings");
    //   });
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <h3>Edit name</h3>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="first_name"
          placeholder="Enter First Name"
          label="First Name"
          {...formik.getFieldProps("first_name")}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <div>{formik.errors.first_name}</div>
        ) : null}
        <TextField
          name="last_name"
          placeholder="Enter Last Name"
          label="Last Name"
          {...formik.getFieldProps("last_name")}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <div>{formik.errors.last_name}</div>
        ) : null}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </DashboardLayout>
  );
}

export default ProfileName;
