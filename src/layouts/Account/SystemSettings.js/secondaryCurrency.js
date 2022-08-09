import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import { useAccount, useCurrency, useAccountData } from "api/accapi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import { Button, Select } from "@mui/material";
import MDTypography from "components/MDTypography";

function Secondary() {
  const { data: account } = useAccount();
  const accountDetails = account?.user || {};
  const initialValues = {
    secondaryCurrency: accountDetails.secondaryCurrency,
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
  const classes = useStyles();
  const navigate = useNavigate();
  const { data: currencyfilter } = useCurrency();
  const [formValues, setformValues] = useState(initialValues);
  const [isValid, setValid] = useState(false);
  const [filter, setFilter] = useState({});
  const [putData] = useAccountData();
  const handleChanges = (e) => {
    const { name, value } = e.target;
    handleValidation({ ...formValues, [name]: value });
    setformValues({ ...formValues, [name]: value });
  };

  const handleChange = (e) => {
    setValid(true);
    setFilter(e.target.value);
  };
  const handleSubmit = () => {
    putData({
      ...formValues,
    })
      .unwrap()
      .then(() => {
        navigate("/system-settings");
      });
  };
  console.log(currencyfilter);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography>Edit secondary currency</MDTypography>
      <form onInput={handleChanges}>
        <Select
          className={classes.select}
          name="secondary_currency"
          defaultValue={formValues.secondaryCurrency}
          onChange={handleChange}
        >
          {currencyfilter?.coins?.map((value, id) => (
            <MenuItem value={value.coin_id} key={id}>
              {value.coin_id}
            </MenuItem>
          ))}
        </Select>
      </form>
      <Button
        variant="contained"
        className={classes.button}
        disabled={!isValid}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </DashboardLayout>
  );
}
export default Secondary;
