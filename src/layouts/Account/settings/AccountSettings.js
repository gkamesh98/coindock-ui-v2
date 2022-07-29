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

function AccountSettings() {
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
      label: "Email",
      fieldKey: "email",
    },
    {
      label: "Change Password",
      fieldKey: "changePassword",
    },
    {
      label: "Recovery Code",
      fieldKey: "recoverycode",
    },
  ];

  const handlePassword = () => {
    navigate("/apassword");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {fields.map((field, id) => (
        <div key={id}>
          {field.fieldKey === "email" ? (
            <Card className={classes.card}>
              <CardContent>
                <MDTypography>
                  {field.label} : {`${accountDetails.email}`}
                </MDTypography>
              </CardContent>
            </Card>
          ) : field.fieldKey === "changePassword" ? (
            <Card className={classes.card}>
              <CardContent>
                <MDTypography> {field.label}</MDTypography>
                <span
                  type="submit"
                  onClick={() => {
                    handlePassword();
                  }}
                >
                  <FaEdit />
                </span>
              </CardContent>
            </Card>
          ) : field.fieldKey === "recoverycode" ? (
            <Card className={classes.card}>
              <CardContent>
                <MDTypography>
                  {" "}
                  {field.label} : {accountDetails.country}
                </MDTypography>
                <button
                  onClick={() => {
                    navigate("/recovery-codes-account");
                  }}
                  className="cd-card-button1"
                >
                  Re-Generate
                </button>
              </CardContent>
            </Card>
          ) : null}
        </div>
      ))}
    </DashboardLayout>
  );
}
export default AccountSettings;
