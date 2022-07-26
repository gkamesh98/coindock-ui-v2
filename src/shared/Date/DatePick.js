import React, { useState } from "react";
import DatePicker from "react-datepicker";
import propTypes from "prop-types";
import moment from "moment";

export const dateValidation = (value) => {
  let error = null;
  if (!value) {
    error = "Date of birth is required";
  }
  if (moment().diff(value, "years") < 15) {
    error = "You need to be 15 years old to register for CoinDock";
  }
  return error;
};
function DatePick({ name, onChange, formErrors,value}) {

 const [selectedDate, setSelectedDate] = useState("");
 const [date, setDate] = useState(new Date(value))
 const [fieldsTouched, setFieldsTouched] = useState(false);
  const handleChanges = (value) => {
    if (onChange) {
      onChange({
        target: {
          value: moment(value).format("YYYY-MM-DD"),
          name,
        },
      });
    }
    setSelectedDate(value);
    setDate(value)
  };

  const handleFocus = () => {
    setFieldsTouched(true);
  };

  return (
    <React.Fragment>
      <label className="cd-mt-12 cd-lable-signup">Date of Birth</label>
      <DatePicker
        name={name}
        className="form-control cd-mt-8"
        selected={value ? date : selectedDate}
        onChange={handleChanges}
        dateFormat="dd-MM-yyyy"
        onBlur={handleFocus}
      />
      {fieldsTouched && <p className="text-danger">{formErrors[name]}</p>}
    </React.Fragment>
  );
}
DatePick.propTypes = {
  label: propTypes.number,
  onChange:propTypes.func,
  value:propTypes.string,
  formErrors:propTypes.object,
};
export default DatePick;
