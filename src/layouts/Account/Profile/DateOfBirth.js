import React, { useState } from "react";
import { Field, useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useAccountData } from "api/accapi";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import { useAccount } from "api/accapi";
import moment from "moment";
import * as Yup from "yup";
import DatePick from "Shared/Date/DatePick";

function DateofBirth() {
  const { data: account } = useAccount();
  const accountDetails = account?.user || {};
  const [formErrors, setformErrors] = useState({});

  const initialValues = {
    dateOfBirth: accountDetails.dateOfBirth,
  };
  const validationSchema = Yup.object({
    dateOfBirth: Yup.string()
      .required("Date-of-birth is required")
      .test("DOB", "You need to be 15 years old to register for CoinDock", (value) => {
        console.log("check", value);
        return moment().diff(moment(value), "years") >= 15;
      }),
  });

  const navigate = useNavigate();
  const [formValues, setformValues] = useState(initialValues);

  const [getData] = useAccountData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
    formik.setFieldValue(name);
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
  const handleSubmit = () => {
    getData({
      ...formValues,
    })
      .unwrap()
      .then(() => {
        navigate("/profile-settings");
      });
    setformErrors(formErrors);
  };
  const formik = useFormik({
    initialValues,
    handleChange,
    handleSubmit,
    validationSchema,
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form className={classes.dates}>
        <DatePick name="dateOfBirth" value={formik.values.dateOfBirth} onChange={handleChange} />
        {formik?.errors?.dateOfBirth ? (
          <div style={{ fontSize: "14px", color: "red", marginTop: "3px" }}>
            {formik?.errors?.dateOfBirth}
          </div>
        ) : null}
      </form>

      <MDButton
        className={classes.button}
        variant="gradient"
        color="info"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </MDButton>
    </DashboardLayout>
  );
}
export default DateofBirth;
