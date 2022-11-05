import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useAccount, useCurrency, useAccountData } from "api/accapi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Box, Card, CardContent, CardHeader, CircularProgress } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useFormik } from "formik";

function Primary() {
  const { data: account } = useAccount();

  const accountDetails = account?.user || {};

  const navigate = useNavigate();

  const { data: currencyfilter, isLoading } = useCurrency();

  const [isValid, setValid] = useState(false);

  const [putData] = useAccountData();

  const currencylist = currencyfilter?.map((value, id) => value.coinId);

  const formik = useFormik({
    initialValues: { primaryCurrency: accountDetails ? accountDetails.primaryCurrency : "" },

    onSubmit: (values, { setFieldError }) => {
      putData({
        ...values,
      })
        .unwrap()
        .then(() => {
          navigate("/system-settings");
        })
        .catch((error) => {
          if (error.status === 422) {
            Object.entries(error?.data?.errors).forEach(([index, value]) =>
              setFieldError(index, value)
            );
          }
        });
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    formik.values.primaryCurrency != accountDetails.primaryCurrency
      ? setValid(true)
      : setValid(false);
  }, [formik.values.primaryCurrency]);

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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? (
        <Box display="flex" width={0.5} justifyContent="center">
          <CircularProgress style={{ color: "blue" }} />
        </Box>
      ) : (
        <Card className={classes.card}>
          <CardHeader title="Edit primary currency" />
          <CardContent>
            <MDBox mb={5} mt={5} component="form" role="form" onSubmit={formik.handleSubmit}>
              <Autocomplete
                disablePortal
                options={currencylist}
                disableClearable={true}
                value={formik.values.primaryCurrency}
                onChange={(event, newValue) => {
                  formik.setFieldValue("primaryCurrency", newValue);
                }}
                renderInput={(params) => (
                  <MDInput
                    type="select"
                    {...params}
                    label="Primary Currency"
                    name="Primary Currency"
                    variant="standard"
                    fullWidth
                    required
                    {...formik.getFieldProps("primaryCurrency")}
                  />
                )}
              />
              {formik.touched.primaryCurrency && formik?.errors?.primaryCurrency ? (
                <MDTypography color="error" fontSize="12px">
                  {formik?.errors?.primaryCurrency}
                </MDTypography>
              ) : null}
            </MDBox>
          </CardContent>

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
        </Card>
      )}
    </DashboardLayout>
  );
}

export default Primary;
