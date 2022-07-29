import React from "react";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccount } from "api/accapi";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";

function SystemSettings() {
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
      label: "Primary currency",
      fieldKey: "primarycurrency",
      type: "edit",
    },
    {
      label: "Secondary currency",
      fieldKey: "secondarycurrency",
      type: "edit",
    },
  ];
  const handlePrimary = () => {
    navigate("/primary");
  };
  const handleSecondary = () => {
    navigate("/secondary");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {fields.map((field, id) => (
        <div key={id}>
          {field.fieldKey === "primarycurrency" ? (
            <Card className={classes.card}>
              <CardContent>
                <MDTypography>
                  {field.label} :{" "}
                  {`${accountDetails.primary_currency} ${accountDetails.primary_currency_symbol}`}
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
                    handlePrimary();
                  }}
                >
                  <FaEdit />
                </span>
              </CardContent>
            </Card>
          ) : field.fieldKey === "secondarycurrency" ? (
            <Card className={classes.card}>
              <CardContent>
                <MDTypography>
                  {" "}
                  {field.label} :{" "}
                  {`${accountDetails.secondary_currency} ${accountDetails.secondary_currency_symbol}`}
                </MDTypography>
                <span
                  type="submit"
                  onClick={() => {
                    handleSecondary();
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
export default SystemSettings;
