import React from "react";
import "../Account.css";
import moment from "moment";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAccount } from "App/Api/accapi";
import { FaEdit, FaArrowLeft } from "react-icons/fa";

import "../../../Shared/common-styles/button.css";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";

function ProfileSettings() {
  const { data: account, message } = useAccount();
  const accountDetails = account?.data?.results?.user || {};
  const navigate = useNavigate();
  const fields = [
    {
      label: "Name",
      fieldKey: "name",
      type: "edit",
    },
    {
      label: "Date-of-Birth",
      fieldKey: "dateofbirth",
      type: "edit",
    },
    {
      label: "Country",
      fieldKey: "country",
      type: "edit",
    },
  ];

  const date = moment(accountDetails.date_of_birth).format("DD-MM-YYYY");

  const handleProfileName = () => {
    navigate("/profile-name");
  };
  const handleProfileDob = () => {
    navigate("/profile-dob");
  };
  const handleProfileCountry = () => {
    navigate("/profile-country");
  };
  return (
    <div>
      {/* <div type="submit" className="cd-back"onClick={()=>{navigate("/account")}}>< FaArrowLeft/></div> */}
      {/* <h2 className="cd-headerStyle">Profile settings</h2> */}
      <ArrowBackIosIcon
        type="submit"
        style={{ maxWidth: 45, marginTop: "35px" }}
        onClick={() => {
          navigate("/account");
        }}
      />{" "}
      <Typography
        style={{
          textAlign: "center",
          fontWeight: "lighter",
          fontFamily: "monospace",
          marginTop: "-30px",
          marginBottom: "10px",
        }}
        variant="h4"
      >
        Profile settings
      </Typography>
      {fields.map((field, id) => (
        <div className="cd-card1" key={id}>
          {field.fieldKey === "name" ? (
            <Card className="cd-cardstyle bg-light mb-3">
              <CardContent className="d-flex justify-content-between">
                <Typography>
                  {" "}
                  {field.label} : {`${accountDetails.first_name} ${accountDetails.last_name}`}
                </Typography>
                <span
                  type="submit"
                  onClick={() => {
                    handleProfileName();
                  }}
                >
                  <FaEdit />
                </span>
              </CardContent>
            </Card>
          ) : field.fieldKey === "dateofbirth" ? (
            <Card className="cd-cardstyle bg-light mb-3">
              <CardContent className="d-flex justify-content-between">
                <Typography>
                  {" "}
                  {field.label} : {date}
                </Typography>
                <span
                  type="submit"
                  onClick={() => {
                    handleProfileDob();
                  }}
                >
                  <FaEdit />
                </span>
              </CardContent>
            </Card>
          ) : field.fieldKey === "country" ? (
            <Card className="cd-cardstyle bg-light mb-3">
              <CardContent className="d-flex justify-content-between">
                <Typography>
                  {" "}
                  {field.label} : {accountDetails.country}
                </Typography>
                <span
                  type="submit"
                  onClick={() => {
                    handleProfileCountry();
                  }}
                >
                  <FaEdit />
                </span>
              </CardContent>
            </Card>
          ) : null}
        </div>
      ))}
    </div>
  );
}
export default ProfileSettings;
