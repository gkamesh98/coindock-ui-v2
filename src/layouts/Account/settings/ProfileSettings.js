import React from "react";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccount } from "api/accapi";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";

function ProfileSettings() {
  const { data: account } = useAccount();
  const accountDetails = account?.data?.results?.user || {};
  console.log(account);

  const navigate = useNavigate();
  const useStyles = makeStyles({
    card: {
      justifyContent: "space-between",
      margin: "auto",
      marginTop: "30px",
      width: "100%",
      height: "70px",
      marginBottom: "20px",
    },
  });
  const classes = useStyles();
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

  const handleProfileName = () => {
    navigate("/profile-name");
  };
  const handleProfileDob = () => {
    navigate("/profile-dob");
  };
  const handleProfileCountry = () => {
    navigate("/profile-country");
  };
  const date = moment(accountDetails.date_of_birth).format("DD-MM-YYYY");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {fields.map((field, id) => (
        <div key={id}>
          {field.fieldKey === "name" ? (
            <Card className={classes.card}>
              <CardContent>
                <MDTypography>
                  {field.label} : {accountDetails.first_name + " " + accountDetails.last_name}
                </MDTypography>
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
            <Card className={classes.card}>
              <CardContent>
                <MDTypography>
                  {" "}
                  {field.label} : {date}
                </MDTypography>
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
            <Card className={classes.card}>
              <CardContent>
                <MDTypography>
                  {" "}
                  {field.label} : {accountDetails.country}
                </MDTypography>
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
    </DashboardLayout>
  );
}
export default ProfileSettings;
