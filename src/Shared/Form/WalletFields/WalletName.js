/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import propTypes from "prop-types";

export const walletnameValidation = (value, label = "Name") => {
  let error = null;

  if (!value) {
    error = `${label} is required`;
  }
  return error;
};

function WalletName({ label, name, placeholder, formErrors, onInput, currentFieldValue }) {
  const [fieldsTouched, setFieldsTouched] = useState(false);

  const handleFocus = () => {
    setFieldsTouched(true);
  };
  const handleInput = (e) => {
    setFieldsTouched(true);
    onInput?.(e);
  };

  return (
    <div className="form-group">
      <div>
        <label className="cd-mt-12 cd-lable-signup">{label}</label>
        <input
          type="text"
          className="form-control cd-mt-8"
          name={name}
          placeholder={placeholder}
          defaultValue={currentFieldValue}
          onBlur={handleFocus}
          onInput={handleInput}
        />
      </div>
      {formErrors && fieldsTouched && <p className="text-danger">{formErrors[name]}</p>}
    </div>
  );
}

WalletName.propTypes = {
  label: propTypes.string,
};
export default WalletName;
