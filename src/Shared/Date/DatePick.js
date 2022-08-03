import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import propTypes from "prop-types";
import moment from "moment";

function DatePick({ name, value, onChange }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [date, setDate] = useState(new Date(value));

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
    setDate(value);
  };
  const useStyles = makeStyles({
    input: {
      marginTop: "10%",
      width: "150px",
      height: "25px",
      borderRadius: "5px",
    },
  });
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        name="dateOfBirth"
        label="Date"
        className={classes.input}
        value={value ? date : selectedDate}
        onChange={handleChanges}
        renderInput={(params) => <TextField {...params} />}
      />
      {/* {
        <p style={{ fontSize: "16px", color: "red" }} className="text-danger">
          {formErrors[name]}
        </p>
      } */}
    </LocalizationProvider>
  );
}
DatePick.propTypes = {
  name: propTypes.string,
  formErrors: propTypes.string,
  label: propTypes.number,
  onChange: propTypes.func,
  value: propTypes.string,
};
export default DatePick;
