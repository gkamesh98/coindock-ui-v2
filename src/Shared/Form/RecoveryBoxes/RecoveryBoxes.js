import { chainPropTypes } from "@mui/utils";
/* eslint-disable react/prop-types */
import React from "react";

function RecoveryBoxs(props) {
  return (
    <div className="cd-code-box">
      {props.input ? (
        <input className="cd-box-input-data" type="text" value={props.code} name={props.index} />
      ) : (
        <p className="cd-box-data">{props?.code}</p>
      )}
      <p className="cd-box-index">{props.index}</p>
    </div>
  );
}

export default RecoveryBoxs;
