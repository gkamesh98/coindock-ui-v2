import React from "react";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccount } from "api/accapi";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button, Box, CircularProgress } from "@mui/material";

function AccountSettings() {
  const { data: account, isLoading } = useAccount();
  const accountDetails = account?.user || {};

  const navigate = useNavigate();
  const useStyles = makeStyles({
    card: {
      cursor: "pointer",
      minWidth: "300px",
      maxWidth: "550px",
      margin: "auto",
      marginTop: "30px",
      marginBottom: "20px",
      padding: "10px",
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
      navigate: " ",
      value: accountDetails.email,
    },
    {
      label: "Change Password",
      key: "changePassword",
      navigate: "/account-password",
      value: "",
    },
    {
      label: "Recovery Code",
      navigate: "/recovery-codes-account",
      key: "recoverycode",
      value: (
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            navigate("/account/recovery");
          }}
        >
          Re-Generate
        </Button>
      ),
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
            <Card className={classes.card}>
              <CardContent>
                <MDTypography>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                    }}
                  >
                    {field.label}
                  </span>
                  {field.key != "email" ? "" : <br></br>}
                  <span style={{ fontWeight: 300 }}> {field.value} </span>

                  <span
                    style={{ float: "right" }}
                    type="submit"
                    onClick={() => {
                      navigate(field.navigate);
                    }}
                  >
                    {field.key == "changePassword" ? <ModeEditIcon /> : null}
                  </span>
                </MDTypography>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </DashboardLayout>
  );
}
export default AccountSettings;
