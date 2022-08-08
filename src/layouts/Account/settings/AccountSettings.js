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
      key: "email",
      displayLabel: "Email",
    },
    {
      label: "Change Password",
      key: "changePassword",
      navigate: "/account-password",
      displayLabel: "Change Password",
    },
    {
      label: "Recovery Code",
      displayLabel: "Recovery Code",
      navigate: "/recovery-codes-account",
      key: "recoverycode",
    },
  ];

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
            {field.displayLabel ? (
              <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                  <MDTypography style={{ fontSize: "18px" }}>
                    {field.label}:{" "}
                    {field.key == "email" ? (
                      accountDetails.email
                    ) : field.key == "changePassword" ? (
                      <span
                        type="submit"
                        style={{ float: "right" }}
                        onClick={() => {
                          navigate(field.navigate);
                        }}
                      >
                        <FaEdit />
                      </span>
                    ) : field.key == "recoverycode" ? (
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={() => {
                          navigate("/recovery-codes-account");
                        }}
                      >
                        Re-Generate
                      </Button>
                    ) : null}
                  </MDTypography>
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
