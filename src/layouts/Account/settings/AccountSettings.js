import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccount } from "api/accapi";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import outlined from "assets/theme/components/button/outlined";
function AccountSettings() {
  const { data: account, isLoading } = useAccount();
  const accountDetails = account?.user || {};
  console.log(account);
  const navigate = useNavigate();
  const useStyles = makeStyles({
    card: {
      cursor: "pointer",
      minWidth: "250px",
      maxWidth: "500px",
      margin: "auto",
      marginTop: "30px",
      height: "70px",
      marginBottom: "20px",
    },
    cardcontent: {
      marginTop: "10px",
    },
    button: {
      float: "right",
      color: "white",
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
    navigate("/account-password");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? (
        <Box display="flex" widht={1} justifyContent="center">
          <CircularProgress style={{ color: "blue" }} />
        </Box>
      ) : (
        fields.map((field, id) => (
          <div key={id}>
            {field.fieldKey === "email" ? (
              <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                  <MDTypography style={{ fontSize: "18px" }}>
                    {field.label} : {`${accountDetails.email}`}
                  </MDTypography>
                </CardContent>
              </Card>
            ) : field.fieldKey === "changePassword" ? (
              <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                  <MDTypography style={{ fontSize: "18px" }}>
                    {" "}
                    {field.label}
                    <span
                      style={{ float: "right" }}
                      type="submit"
                      onClick={() => {
                        handlePassword();
                      }}
                    >
                      <FaEdit />
                    </span>
                  </MDTypography>
                </CardContent>
              </Card>
            ) : field.fieldKey === "recoverycode" ? (
              <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                  <MDTypography style={{ fontSize: "18px" }}> {field.label}</MDTypography>
                  <Button
                    variant="contained"
                    style={{ marginTop: "-7%" }}
                    className={classes.button}
                    onClick={() => {
                      navigate("/recovery-codes-account");
                    }}
                  >
                    Re-Generate
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>
        ))
      )}
    </DashboardLayout>
  );
}
export default AccountSettings;
