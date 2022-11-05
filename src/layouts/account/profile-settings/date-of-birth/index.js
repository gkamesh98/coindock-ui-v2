import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useAccountData, useAccount } from "api/accapi";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import moment from "moment";
import * as Yup from "yup";
import { Box, Card, CardContent, CardHeader, CircularProgress } from "@mui/material";
import MDInput from "components/MDInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DateofBirth() {
  const { data: account, isLoading } = useAccount();

  const accountDetails = account?.user || {};

  const [isValid, setValid] = useState(false);

  const initialValues = {
    dateOfBirth: accountDetails.dateOfBirth,
  };

  const navigate = useNavigate();

  const [putData] = useAccountData();

  const useStyles = makeStyles({
    button: {
      height: "15px",
      marginLeft: "20px",
      marginBottom: "20px",
    },
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
        dateOfBirth: moment(values.dateOfBirth).format("YYYY-MM-DD"),
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
      dateOfBirth: Yup.string()
        .nullable()
        .required("Required")
        .test("DOB", "You need to be 15 years old to register for CoinDock", (value) => {
          return moment().diff(moment(value), "years") >= 15;
        }),
    }),
    enableReinitialize: true,
  });

  useEffect(() => {
    formik.values.dateOfBirth != accountDetails.dateOfBirth ? setValid(true) : setValid(false);
  }, [formik.values.dateOfBirth]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? (
        <Box display="flex" width={0.5} justifyContent="center">
          <CircularProgress style={{ color: "blue" }} />
        </Box>
      ) : (
        <Card className={classes.card}>
          <CardHeader title="Edit Date of Birth" />
          <CardContent>
            <MDBox mb={5} mt={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disableFuture
                  onChange={(date) => {
                    formik.setFieldValue("dateOfBirth", moment(date).format("YYYY-MM-DD"));
                  }}
                  value={formik.values.dateOfBirth}
                  renderInput={(params) => (
                    <MDInput
                      type="select"
                      {...params}
                      label={formik.values.dateOfBirth ? "Date of birth" : null}
                      variant="standard"
                      name="dateOfBirth"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      error={false}
                      required
                      {...formik.getFieldProps("dateOfBirth")}
                    />
                  )}
                />
              </LocalizationProvider>

              {formik.touched.dateOfBirth && formik?.errors?.dateOfBirth ? (
                <MDTypography color="error" fontSize="12px">
                  {formik?.errors?.dateOfBirth}
                </MDTypography>
              ) : null}
            </MDBox>

            <MDBox>
              <MDButton
                className={classes.button}
                variant="gradient"
                disabled={!isValid}
                color="info"
                type="submit"
                onClick={formik.handleSubmit}
              >
                Submit
              </MDButton>
            </MDBox>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
export default DateofBirth;
