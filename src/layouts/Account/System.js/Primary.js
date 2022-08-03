import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import { useAccount, useCurrency, useAccountData } from "api/accapi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import { Button, Select } from "@mui/material";
import MDTypography from "components/MDTypography";

function Primary() {
  const { data: account } = useAccount();
  const accountDetails = account?.user || {};
  const initialValues = {
    primaryCurrency: accountDetails.primaryCurrency,
  };
  const navigate = useNavigate();
  const { data: currencyfilter } = useCurrency();
  const [formValues, setformValues] = useState(initialValues);
  // const [isValid, setValid] = useState(false);
  const [filter, setFilter] = useState({});
  const [getData] = useAccountData();
  const handleChanges = (e) => {
    const { name, value } = e.target;
    handleValidation({ ...formValues, [name]: value });
    setformValues({ ...formValues, [name]: value });
  };
  console.log(currencyfilter);
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const handleSubmit = () => {
    getData({
      ...formValues,
    })
      .unwrap()
      .then(() => {
        navigate("/system-settings");
      });
  };
  const useStyles = makeStyles({
    button: {
      height: "15px",
      color: "white",
      marginTop: "15px",
    },
    select: {
      width: "200px",
      height: "25px",
    },
  });
  console.log("....from primary", currencyfilter);
  const classes = useStyles();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography>Edit primary currency</MDTypography>
      <form onInput={handleChanges}>
        <Select
          className={classes.select}
          name="primary_currency"
          defaultValue={formValues.primaryCurrency}
          onChange={handleChange}
        >
          {currencyfilter?.coins?.map((value, id) => (
            <MenuItem value={value.coin_id} key={id}>
              {value.coin_id}
            </MenuItem>
          ))}
        </Select>
      </form>
      <Button variant="contained" className={classes.button} onClick={handleSubmit}>
        Submit
      </Button>
    </DashboardLayout>
  );
}
export default Primary;
