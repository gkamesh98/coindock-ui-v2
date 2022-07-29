import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccountData } from "api/accapi";
import { useNavigate } from "react-router-dom";
import { useAccount } from "api/accapi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Button } from "@mui/material";
const dateValidation = (value) => {
  let error = null;
  if (!value) {
    error = "Date of birth is required";
  }
  if (moment().diff(value, "years") < 15) {
    error = "You need to be 15 years old to register for CoinDock";
  }
  return error;
};
function DateofBirth() {
  const { data: account } = useAccount();
  const accountDetails = account?.data?.results?.user || {};
  const [formErrors, setformErrors] = useState({});
  const initialValues = {
    date_of_birth: accountDetails.date_of_birth,
  };
  const navigate = useNavigate();
  const [formValues, setformValues] = useState(initialValues);
  const [isValid, setValid] = useState(false);
  const [getData] = useAccountData();
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
    handleValidation({ ...formValues, [name]: value });
  };
  console.log(setformValues);
  const handleValidation = (values) => {
    const errors = {};
    errors.date_of_birth = dateValidation(values.date_of_birth);
    const isValid = !Object.values(errors).some(Boolean);
    setformErrors(errors);
    setValid(isValid);
    return {
      isValid,
      errors,
    };
  };
  const handleSubmit = () => {
    const { errors, isValid } = handleValidation(formValues);
    if (!isValid) {
      setformErrors(errors);
    } else {
      getData({
        ...formValues,
      })
        .unwrap()
        .then(() => {
          navigate("/profile-settings");
        });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onInput={handleChanges}>
        <DatePicker name="date_of_birth" value={formValues.date_of_birth} formErrors={formErrors} />
      </form>

      <Button className="cd-button-2 cd-button " disabled={!isValid} onClick={handleSubmit}>
        Submit
      </Button>
    </DashboardLayout>
  );
}
export default DateofBirth;
