import React, { useState } from "react";
import { Field, useFormik } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useAccountData } from "api/accapi";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import { useAccount } from "api/accapi";
import moment from "moment";
import * as Yup from "yup";

function DateofBirth() {
  const { data: account } = useAccount();
  const accountDetails = account?.user || {};
  const [isValid, setValid] = useState(false);
  const initialValues = {
    dateOfBirth: accountDetails.dateOfBirth,
  };
  const validationSchema = Yup.object({
    dateOfBirth: Yup.string()
      .nullable()
      .required("Required")
      .test("DOB", "You need to be 15 years old to register for CoinDock", (value) => {
        return moment().diff(moment(value), "years") >= 15;
      }),
  });

  const navigate = useNavigate();
  const [formValues, setformValues] = useState(initialValues);

  const [getData] = useAccountData();

  const handleChange = (value) => {
    setValid(true);
    console.log(value);
    formik.setFieldValue("dateOfBirth", value);
  };

  const useStyles = makeStyles({
    button: {
      height: "20px",
      marginTop: "15px",
    },
    dates: {
      margin: "auto",
      alignItems: "center",
      marginTop: "5px",
    },
  });
  const classes = useStyles();
  const handleSubmit = (values) => {
    getData({
      ...values,
      dateOfBirth: moment(values.dateOfBirth).format("YYYY-MM-DD"),
    })
      .unwrap()
      .then(() => {
        navigate("/profile-settings");
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={formik.handleSubmit} className={classes.dates}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            name="dateOfBirth"
            label="Date"
            inputFormat={"dd/MM/yyyy"}
            className={classes.input}
            value={formik.values.dateOfBirth}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {formik?.errors?.dateOfBirth ? (
          <div style={{ fontSize: "14px", color: "red", marginTop: "3px" }}>
            {formik?.errors?.dateOfBirth}
          </div>
        ) : null}
      </form>

      <MDButton
        disabled={!isValid}
        className={classes.button}
        variant="gradient"
        color="info"
        type="submit"
        onClick={formik.handleSubmit}
      >
        Submit
      </MDButton>
    </DashboardLayout>
  );
}
export default DateofBirth;
