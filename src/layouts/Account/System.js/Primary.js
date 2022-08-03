import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useAccount, useCurrency, useAccountData } from "api/accapi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
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
  const [isValid, setValid] = useState(false);
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
      marginTop: "15px",
    },
  });
  const classes = useStyles();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography>Edit primary currency</MDTypography>
      <form onInput={handleChanges}>
        <select
          style={{ width: "200px", height: "25px" }}
          name="primary_currency"
          defaultValue={formValues.primaryCurrency}
          onChange={handleChange}
          label="Primary Currency"
        >
          {currencyfilter?.coins?.map((value, id) => (
            <option value={value.coin_id} key={id}>
              {value.coin_id}
            </option>
          ))}
        </select>
      </form>
      <MDButton className={classes.button} disabled={!isValid} onClick={handleSubmit}>
        Submit
      </MDButton>
    </DashboardLayout>
  );
}
export default Primary;
