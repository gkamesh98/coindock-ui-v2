import React, { useEffect, useState } from "react";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { makeStyles } from "@mui/styles";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useCountry, useAccount, useAccountData } from "api/accapi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Card, CardContent, CardHeader, Box, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

function Country() {
  const { data: account } = useAccount();

  const accountDetails = account?.user || {};

  const { data, isLoading } = useCountry();

  const [putData] = useAccountData();

  const navigate = useNavigate();

  const [isValid, setValid] = useState(false);

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
    initialValues: { country: accountDetails ? accountDetails.country : "" },
    onKeyUp: (value) => {
      if (e.country != accountDetails.country) {
        setValid(true);
      }
    },
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
    enableReinitialize: true,
  });

  useEffect(() => {
    formik.values.country != accountDetails.country ? setValid(true) : setValid(false);
  }, [formik.values.country]);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {isLoading ? (
          <Box display="flex" width={0.5} justifyContent="center">
            <CircularProgress style={{ color: "blue" }} />
          </Box>
        ) : (
          <Card className={classes.card}>
            <CardHeader title="Edit Country" />

            <CardContent>
              <MDBox mb={5} mt={5} component="form" role="form" onSubmit={formik.handleSubmit}>
                <Autocomplete
                  disablePortal
                  options={data}
                  disableClearable={true}
                  value={formik.values.country}
                  onChange={(event, newValue) => {
                    formik.setFieldValue("country", newValue);
                  }}
                  renderInput={(params) => (
                    <MDInput
                      type="select"
                      {...params}
                      label="Country"
                      name="country"
                      variant="standard"
                      fullWidth
                      required
                      {...formik.getFieldProps("country")}
                    />
                  )}
                />
                {formik.touched.country && formik?.errors?.country ? (
                  <MDTypography color="error" fontSize="12px">
                    {formik?.errors?.country}
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
    </>
  );
}
export default Country;
