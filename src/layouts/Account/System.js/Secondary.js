import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useAccount, useCurrency, useAccountData } from "api/accapi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
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
      marginTop: "15px",
    },
  });
  const classes = useStyles();
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
  console.log(currencyfilter);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography>Edit secondary currency</MDTypography>
      <form onInput={handleChanges}>
        <select
          style={{ width: "200px", height: "25px" }}
          name="secondary_currency"
          defaultValue={formValues.secondaryCurrency}
          onChange={handleChange}
          label="Secondary Currency"
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
export default Secondary;
