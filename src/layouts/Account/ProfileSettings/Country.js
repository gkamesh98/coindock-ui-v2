import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useCountry } from "api/accapi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useAccount } from "api/accapi";
import { useAccountData } from "api/accapi";
import { Select } from "@mui/material";
import { useFormik } from "formik";

function Country() {
  const { data: account } = useAccount();
  const accountDetails = account?.user || {};
  const [isValid, setValid] = useState(false);
  const initialValues = {
    country: accountDetails.country,
  };
  const { data: countryfilter, isLoading } = useCountry();

  const [formValues, setformValues] = useState(initialValues);

  const [putData] = useAccountData();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValid(true);
    setformValues({ ...formValues, [name]: value });
  };
  const navigate = useNavigate();

  const useStyles = makeStyles({
    input: {
      marginLeft: "3.5rem",
      width: "200px",
      height: "25px",
      marginTop: "3px",
      borderRadius: "5px",
    },
    button: {
      height: "15px",
      marginTop: "15px",
      marginLeft: "3.5rem",
    },
  });
  const classes = useStyles();
  const handleSubmit = () => {
    putData({
      ...formValues,
    })
      .unwrap()
      .then(() => {
        navigate("/profile-settings");
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDTypography px={3} ml={4}>
          Edit Country
        </MDTypography>
        <form onInput={(e) => handleChange(e)}>
          {isLoading ? (
            <Box display="flex" width={0.5} justifyContent="center">
              <CircularProgress style={{ color: "blue" }} />
            </Box>
          ) : (
            <Select
              name="country"
              className={classes.input}
              onChange={handleChange}
              defaultValue={formik.values.country}
            >
              {countryfilter?.countries?.map((value) => {
                return (
                  <MenuItem value={value} key={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </form>

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
      </DashboardLayout>
    </>
  );
}
export default Country;
